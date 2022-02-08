const fs=require('fs');
const rfs=require('rotating-file-stream');
const path= require('path');
const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log',{
    interval:'1d',
    path:logDirectory
});


const development = {
    name: 'development',
    asset_path:'./assets',
    session_cookie_key:'blahsomething',
    db:'Social_Development',
    smpt:{
        service:'gmail',
        host:'smpt.gmail.com',
        port:'587',
        secure:false,
        auth:{
            user:process.env.SOCIAL_GMAIL_USERNAME,
            pass:process.env.SOCIAL_GMAIL_PASSWORD
    
        }
    },
    google_client_iD: "348955448407-iln18lu046digmkc49dbq9h64dmpqivt.apps.googleusercontent.com",
    google_client_Secret: "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",
    google_callback_URL: "http://localhost:8000/user/auth/google/callback",
    jwt_secret:'social',
    morgan:{
        mode:'dev',
        options:{
            stream:accessLogStream
        }
    }
} 
const production = {
    name: 'production',
    asset_path:process.env.SOCIAL_ASSET_PATH,
    session_cookie_key:process.env.SOCIAL_SESSION_COOKIE_KEY,
    db:process.env.SOCIAL_DB,
    smpt:{
        service:'gmail',
        host:'smpt.gmail.com',
        port:'587',
        secure:false,
        auth:{
            user:process.env.SOCIAL_GMAIL_USERNAME,
            pass:process.env.SOCIAL_GMAIL_PASSWORD
    
        }
    },
    google_client_iD: process.env.SOCIAL_GOOGLE_CLIENT_ID,
    google_client_Secret: process.env.SOCIAL_GOOGLE_CLIENT_SECRET,
    google_callback_URL: process.env.SOCIAL_GOOGLE_CALLBACK_URL,
    jwt_secret:process.env.SOCIAL_JWT_SECRET,
    morgan:{
        mode:'combined',
        options:{
            stream:accessLogStream
        }
    }
}

module.exports=eval(process.env.NODE_ENV)==undefined?development:eval(process.env.SOCIAL_ENVIRONMENT);