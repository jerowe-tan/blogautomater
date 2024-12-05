import swagger from "@elysiajs/swagger";

export default swagger({
  path: '/',
  documentation: {
    info: {
      title: 'Blog Automation',
      description: "I'm tired of doing things manually so I created an automation",
      termsOfService: "https://tmsph.app/terms-service",
      contact: {
        name: "Me, Myself and I",
        url: "https://toyotalogistics.com.ph",
        email: "j.tan@toyota-mobilitysolutions.ph"
      },
      version: '0.0.1',
    },
    tags: [
      {
        name: 'Blog',
        description: 'Create Blogs Using AI',
        
      },
    ],
  }
})


// export default swagger({
//   path: "/",
//   documentation: {
//     info: {
//       title: "TMSPH Developer API Platform Documentation",
//       description:
//         "Toyota Mobility Solutions Philippines' Developer API Platform for Logistics Matching Services, Car Rental Business (Toyota RentaCar), and Fleet Management System",
//       termsOfService: "https://tmsph.app/terms-service",
//       contact: {
//         name: "Software Development and Integration",
//         url: "https://tmpsph.app/support",
//         email: "sdi@toyota-mobilitysolutions.ph",
//       },
//       version: "0.0.1",
//     },
//     tags: [
//       {
//         name: "Blog",
//         description: "General endpoints",
//       },
//       {
//         name: "Quotation",
//         description: "Quotation endpoints",
//       },
//       {
//         name: "Booking",
//         description: "Booking endpoints",
//       },
//       {
//         name: "Tracking",
//         description: "Tracking endpoints",
//       },
//       {
//         name: "Auth",
//         description: "Authentication endpoints",
//       },
//       {
//         name: "ToyotaRentaCar",
//         description: "Toyota RentaCar APIs",
//       },
//       {
//         name: "Other",
//         description: "Other endpoints",
//       },
//       {
//         name: "Miscellaneous",
//         description: "Miscellaneous endpoints",
//       },
//     ],
//   },
// })