import mime from 'mime';
import { HttpNativePlate } from "../../helpers/HttpNative";
import { generateJWT } from "../../helpers/t2/JWT";
import { ENV } from "../../structure/WebTypes";

const mapper = new Map<string, string>();

export class GoogleDrive{
  env?:ENV;
  loginToken?:string;
  driveId?:string;
  processing:undefined|Promise<"processing"> = undefined;
  constructor(env:ENV){
    this.env = env;
  }

  setDriveId(driveId:string){
    this.driveId = driveId;
    return this;
  }
  
  login(async:true):Promise<string>
  login(async:false):this
  login():this
  login(async = false){
 
    if(mapper.has("previousGoogleDriveAuthToken")){
      this.loginToken = mapper.get("previousGoogleDriveAuthToken");
      return this;
    }
    if(this.env == undefined)
      throw new Error("ENV is not place on Google Drive class");
    const THIS = this;
    THIS.processing = Promise.resolve("processing");
    async function fetchOAuth(){
      if(THIS.env == undefined)
        throw new Error("ENV is not place on Google Drive class");

      const jwt = await generateJWT(THIS.env.GOOGLE_DRIVE_PRIVATE_KEY, {
        "iss": THIS.env.GOOGLE_DRIVE_CLIENT_EMAIL,
        "scope": "https://www.googleapis.com/auth/drive", 
        "aud":"https://oauth2.googleapis.com/token"
      });
      const getToken = new HttpNativePlate("https://oauth2.googleapis.com/token", {});
      const tokenResult = await getToken.post().path("").data(JSON.stringify({
        grant_type:"urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion:jwt,
      })).request();
      THIS.loginToken = (await tokenResult.json() as any).access_token;
      THIS.processing = undefined;
      mapper.set("previousGoogleDriveAuthToken", THIS.loginToken as string);
      console.log(THIS.loginToken);
      return THIS.loginToken;
    }
    if(async){
      return new Promise((resolve)=>{
        fetchOAuth().then((d)=>{
          resolve(d);
        })
      })
    }
    THIS.processing = undefined;
    fetchOAuth();
    return THIS;
  }

  async store(file:Blob, pathName:string):Promise<Response>{
    if(!this.driveId){
      throw new Error("No Drive Id Provided");
    }
    if(!this.loginToken){
      throw new Error("Login Token is not yet created");
    }
    const form = new FormData();
    const fileName =  /[^\\/]+$/.test(pathName) ? (pathName.match(/[^\\/]+$/) as RegExpMatchArray)[0] : "blank.txt";
    const MimeName = mime.getType(fileName) as string;

    // Create file metadata
    const metadata = {
      name: fileName, // Name of the file to be created
      mimeType:MimeName,
      parents: [this.driveId], // ID of the shared folder
    };

    form.append(
      'metadata',
      JSON.stringify(metadata),
    );
    form.append('file', file, fileName);
    
    const request = new HttpNativePlate("https://www.googleapis.com/upload/drive/v3")
    request.path("/files").params({
      uploadType:"media"
    }).post().headers({
      Authorization: `Bearer ${this.loginToken}`,
      "Content-Type": MimeName,
    }).data(form)
    const result = await request.request()
    if(result.status == 401){
      mapper.delete("previousGoogleDriveAuthToken")
      await this.login(true);
      return await this.store(file, pathName);
    }
    return result;
  }
}