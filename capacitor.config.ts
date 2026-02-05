 import type { CapacitorConfig } from '@capacitor/cli';
 
 const config: CapacitorConfig = {
   appId: 'app.lovable.f82a540556bb4760b44daa0535913150',
   appName: '智慧学堂',
   webDir: 'dist',
   server: {
     url: 'https://f82a5405-56bb-4760-b44d-aa0535913150.lovableproject.com?forceHideBadge=true',
     cleartext: true
   },
   android: {
     allowMixedContent: true
   }
 };
 
 export default config;