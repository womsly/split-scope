import { toast } from 'react-hot-toast';


let environment = import.meta.env.VITE_APP_ENVIRONMENT;


// when sending a message through base console structure the message as
// {"LOCATION": message}

// check for environment
export const log = (message) => {
  if (environment !== "PRODUCTION") {
    console.log(message);
  }
}

export const error = (message) => {
  if (environment !== "PRODUCTION") {
    console.error(message);
  }
}

// this will remove any messages in PROD incase something is using base console.log
export const clear = () => {
  if (environment === "PRODUCTION") {
    console.clear();
  }
}


// use this when calling api requests for TOAST message to display API response
export const apiErrorToast = (message) => {
  toast.error(message);
}

