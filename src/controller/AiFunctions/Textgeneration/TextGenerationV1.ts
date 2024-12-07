import { BASE64EX_STRING } from "../../../helpers/Cryptographic";
import masterOfSEO from "../Rules/masterOfSEO";

export async function aiBlogTextMDGenerator(AI:Ai, prompt:BASE64EX_STRING){
  // const tasks = [];
  const model = "@cf/meta/llama-3.2-11b-vision-instruct";

  const messages = [
    masterOfSEO,
    { role: "user", content: "" }
  ];
  
  const payload = structuredClone({
    max_tokens: 768,
    messages:[
      masterOfSEO,
      { role: "user", content: prompt }
    ],
    // prompt: "Hello"
  })
  const response =  await AI.run(model as any, payload as any);
  return (response as any).response as string;
  //Sample Only
  // return "# Measuring Your Parcel Size Like a Pro: Save Money with LMS\n\n## Introduction to Parcel Size Measurements\n\nWhen shipping a package, accurately measuring its size is crucial to avoid additional fees and ensure a smooth delivery experience. As a user of LMS, you want to know how to measure your parcel size like a pro to save money and make the most out of your logistics experience.\n\n## What's the Importance of Accurate Parcel Measurements?\n\nAccurate parcel measurements are vital for several reasons:\n\n*   **Avoid Extra Charges**: If your package is not measured correctly, you might end up paying extra fees for oversized or overweight packages.\n*   **Proper Packaging**: Measuring your parcel size helps you choose the right packaging materials, ensuring your items are protected during transit.\n*   **Faster Transit**: Precise measurements enable you to select the right shipping method, which can lead to faster transit times and better tracking.\n\n## How to Measure Your Parcel Size Like a Pro\n\n### Measuring Length and Width\n\n1.  **Use a Flexible Tape Measure**: Measure the longest and widest points of your parcel.\n2.  **Take Multiple Measurements**: Ensure you measure all sides to account for irregular shapes.\n3.  **Round-Up to Th eNearest Centimeter**: Round up to the nearest centimeter if your measurements are not a whole number.\n\n### Measuring Height\n\n1.  **Tilt and Stack**: Place the longest side on a flat surface, and stack the parcel to measure the height from the base to the highest point.\n2.  **Use a Ruler or Tape Measure**: Record the height in centimeters.\n\n### Calculating Weight\n\n1.  **Accurate Calculations**: Weigh your parcel on a digital scale to ensure accurate calculations.\n\n### Choosing the Right Shipping Option\n\n1.  **Compare Shipping Providers**: Research and compare rates from different shipping providers to find the best option for your parcel size and weight.\n2.  **Get Free Quotes**: Get quotes from logistics companies like Lalamove, Transportify, GoGoXpress, and NinjaVan to make an informed decision.\n3.  **Save with Extended Discounts**: Look out for discounts and promotions to save even more on your shipping costs.\n\n## Measuring Your Parcel Size with LMS\n\nAt LMS, our tracking dashboard gives you instant access to your order status, and you can easily recharge your account to cover any shipping costs. This method enables you to save money by making informed shipping decisions and reviewing the orders status.\n\n## Conclusion\n\nMe";
}