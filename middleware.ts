import { authMiddleware } from "@clerk/nextjs";
 
// export default authMiddleware({
//   // Routes that can be accessed while signed out
//   publicRoutes: ['/anyone-can-visit-this-route'],
//   // Routes that can always be accessed, and have
//   // no authentication information
//   ignoredRoutes: ['/no-auth-in-this-route'],
// });

/* This example protects all routes including api/trpc routes
Please edit this to allow other routes to be public as needed
See https://clerk.com/docs/references/nextjs/auth-middleware for more information
about configuring your Middleware
*/ 
export default authMiddleware({});
 
export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your Middleware
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};