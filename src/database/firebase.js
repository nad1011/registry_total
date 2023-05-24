import { initializeApp as clientInit } from "firebase/app";
import { getAuth as getClientAuth } from "firebase/auth";
import { getFirestore as getClientDB } from "firebase/firestore";
import { initializeApp as adminInit, cert } from "firebase-admin/app";
import { getAuth as getAdmninAuth } from "firebase-admin/auth";

const clientApp = clientInit({
  apiKey: "AIzaSyCserEAADxBpBDkNWDig-mQGRXOuyx_-hg",
  authDomain: "registry-total.firebaseapp.com",
  projectId: "registry-total",
  storageBucket: "registry-total.appspot.com",
  messagingSenderId: "733448954659",
  appId: "1:733448954659:web:2e47198e7c5f6a81ed2296",
  measurementId: "G-XCV4J0ZWGM",
});

const adminApp = adminInit({
  credential: cert({
    type: "service_account",
    project_id: "registry-total",
    private_key_id: "038ceb4c0fa436f836a743af439862c4e7fdba22",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC2+vpw84kvPqBu\nEwo4F+ZUikavCw70/vWBCrieG2LkXRc82RPJ6JGYD3SjkktfyByFaCBNx07pFWZu\nW3j0L545rZYxiBnbZmmy3ObM8Gq1vFDtPDvmlp13l6WeVTfOUeMakdsPsA4hmhC+\npvvJXWo18l5yqvev/Gr1dxTvTSepSCW0+hRtgTKGd5/693tgN46Nys3jjzGJmCRc\neEP2ANzva/d6vNY34RrzqBPQGbcSVUDomIIS4ui6HUUcXDm3WqrTtYKv9FY0/wRB\nTXhqy0dRrvLYeiUY6rrklAeFYJEbL3fPqvoL28fdH/OQlTvMmzuWUfrdlNdgedIx\naJOm4Ne7AgMBAAECggEAGmZgns5MUzAudmMx3MD5/uWKaDPovwlQA4O3+jvKS1dx\nBFrvg3iWFQHZ2sW/MT0OfGL3EjG43WE0i6SP8W8zXXABlPjlfiWrB17ev9/KDZlz\ndZ70p4LAimIrR4pVCGQBJ7K2j+9fQpLXaqJt/nIHYmwrG1E2dkItbmf1ccdIeyBK\ncrrbf8IeP4nicSrXVwipGZxpgIcFEzLE6APu5H1+mP2vF2ziYMvrUOC6/thNunvh\nWSwc7OBWunBKYEx0JKoTCsAuLitKUYeIcxekQVbhzDBbojaFNfAt2n1oAPbDWvEq\nNl81uQTNRahPI4K0Bx+0V4AIpo57W+wJdowwZ07p3QKBgQDtl8c1xXyT+kNvW3kr\nT28C18RFKgVmyXzuIbnDcUYojVtwlg7YS+GN71u1ir1qSzpO9ZhTcfm7XoHdxG5H\nB97SnTBfKNbUCrwv8U7b5fF3QVGgACqjC/qHKPotlI+UYt8dE6yjCKkEYc6M1sPx\nuXvhx0d7V4PCYG6MhhphgwLoJwKBgQDFKA+Llu5Zwu5Fd/9/Pud86FsqOVPs1LbG\n/MoJwnYmgEx+eGIwgU3p/ru6UjZyvdRTnjEduJR/9CR8PgmiBz0mEc0r6Uz00Mxk\n1MORFKNc425DaSdAMZYQb+GHyZ6Gmm/dVtiwz7dPmvOz+TBfdFbvX+QrqLDnO94F\nT7/9cLVcTQKBgAeOIAORuBhsiOBtpDjAWeNZQSCB6ZIPLi3UXLfeTkDT3eiCnQ47\nu3xr9BqdwtAyfDQukx10LmDK7I5ExMz1bxx7ayJbhhlQDhPoNH3BniAQr6vK1ZBB\nvUG3B92TL82kJzwheAfnKpi9E3hfC/QP1eSkFZ3SdpojvuAxE32uUNVZAoGAeKei\nk8+jQEV+If9k2c96RUPBft6kkLxAuxg64KwkOD2uEnvDw2FueDQPWOA1OBUaGq4l\n6sVqA8A6j9o7dPAvKNweDrBxCyW44EAhCulxbEg204RHpA50gsylXb8yh7d9nBwo\n8lO8IDh4yfxG8TO2fDnX3iwXTvuhTOjYWtad9sUCgYEA5jXHyW4K1TqjeQepB6y7\n0N+elG9+qkmn1IIIVMTNZ73E5W/780ijM7bzv+2B5H4deIgvzQSbYz86Wa3iXG3S\nq/CAdn67op+SlGlS1iZ3TmnEo5XwprWk/Q8fV9mZCmISCuuRbUz+0zrbf5QH5+MF\ngxPWSXCRs08oBPdcsNWGfxU=\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-g0efw@registry-total.iam.gserviceaccount.com",
    client_id: "118343138704530794475",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-g0efw%40registry-total.iam.gserviceaccount.com",
  }),
});

const clientDB = getClientDB(clientApp);
const clientAuth = getClientAuth(clientApp);
const adminAuth = getAdmninAuth(adminApp);

export { clientDB, clientAuth, adminAuth };
