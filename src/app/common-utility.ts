// Loader Starts
export function showLoader() {
    // Check if the loader already exists
    if (document.getElementById("NotiflixLoadingWrap")) {
      return; // Exit the function if loader is already present
    }
    // Create a div element for the loader
    const loader = document.createElement("div");
    loader.innerHTML = `
        <style>
  [id^=NotiflixLoadingWrap].nx-with-animation {
    -webkit-animation: loading-animation-fade .3s ease-in-out 0s normal;
    animation: loading-animation-fade .3s ease-in-out 0s normal;
  }
  [id^=NotiflixLoadingWrap] {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    position: fixed;
    z-index: 4000;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background: rgba(0, 0, 0, .8);
    font-family: "Quicksand", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  }
  </style>
    
        <div id="NotiflixLoadingWrap" class="notiflix-loading nx-with-animation" style="z-index: 4000; background: rgba(0, 0, 0, 0.8); animation-duration: 400ms; font-family: Quicksand, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif; display: flex; flex-flow: column wrap; align-items: center; justify-content: center;"><div style="width:80px; height:80px;" class="notiflix-loading-icon nx-with-message"><svg xmlns="http://www.w3.org/2000/svg" id="NXLoadingHourglass" fill=" forestgreen" width="80px" height="80px" viewBox="0 0 200 200"><style>@-webkit-keyframes NXhourglass5-animation{0%{-webkit-transform:scale(1,1);transform:scale(1,1)}16.67%{-webkit-transform:scale(1,.8);transform:scale(1,.8)}33.33%{-webkit-transform:scale(.88,.6);transform:scale(.88,.6)}37.5%{-webkit-transform:scale(.85,.55);transform:scale(.85,.55)}41.67%{-webkit-transform:scale(.8,.5);transform:scale(.8,.5)}45.83%{-webkit-transform:scale(.75,.45);transform:scale(.75,.45)}50%{-webkit-transform:scale(.7,.4);transform:scale(.7,.4)}54.17%{-webkit-transform:scale(.6,.35);transform:scale(.6,.35)}58.33%{-webkit-transform:scale(.5,.3);transform:scale(.5,.3)}83.33%,to{-webkit-transform:scale(.2,0);transform:scale(.2,0)}}@keyframes NXhourglass5-animation{0%{-webkit-transform:scale(1,1);transform:scale(1,1)}16.67%{-webkit-transform:scale(1,.8);transform:scale(1,.8)}33.33%{-webkit-transform:scale(.88,.6);transform:scale(.88,.6)}37.5%{-webkit-transform:scale(.85,.55);transform:scale(.85,.55)}41.67%{-webkit-transform:scale(.8,.5);transform:scale(.8,.5)}45.83%{-webkit-transform:scale(.75,.45);transform:scale(.75,.45)}50%{-webkit-transform:scale(.7,.4);transform:scale(.7,.4)}54.17%{-webkit-transform:scale(.6,.35);transform:scale(.6,.35)}58.33%{-webkit-transform:scale(.5,.3);transform:scale(.5,.3)}83.33%,to{-webkit-transform:scale(.2,0);transform:scale(.2,0)}}@-webkit-keyframes NXhourglass3-animation{0%{-webkit-transform:scale(1,.02);transform:scale(1,.02)}79.17%,to{-webkit-transform:scale(1,1);transform:scale(1,1)}}@keyframes NXhourglass3-animation{0%{-webkit-transform:scale(1,.02);transform:scale(1,.02)}79.17%,to{-webkit-transform:scale(1,1);transform:scale(1,1)}}@-webkit-keyframes NXhourglass1-animation{0%,83.33%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(180deg);transform:rotate(180deg)}}@keyframes NXhourglass1-animation{0%,83.33%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(180deg);transform:rotate(180deg)}}#NXLoadingHourglass *{-webkit-animation-duration:1.2s;animation-duration:1.2s;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-timing-function:cubic-bezier(0,0,1,1);animation-timing-function:cubic-bezier(0,0,1,1)}</style><g data-animator-group="true" data-animator-type="1" style="-webkit-animation-name:NXhourglass1-animation;animation-name:NXhourglass1-animation;-webkit-transform-origin:50% 50%;transform-origin:50% 50%;transform-box:fill-box"><g id="NXhourglass2" fill="inherit"><g data-animator-group="true" data-animator-type="2" style="-webkit-animation-name:NXhourglass3-animation;animation-name:NXhourglass3-animation;-webkit-animation-timing-function:cubic-bezier(.42,0,.58,1);animation-timing-function:cubic-bezier(.42,0,.58,1);-webkit-transform-origin:50% 100%;transform-origin:50% 100%;transform-box:fill-box" opacity=".4"><path id="NXhourglass4" d="M100 100l-34.38 32.08v31.14h68.76v-31.14z"></path></g><g data-animator-group="true" data-animator-type="2" style="-webkit-animation-name:NXhourglass5-animation;animation-name:NXhourglass5-animation;-webkit-transform-origin:50% 100%;transform-origin:50% 100%;transform-box:fill-box" opacity=".4"><path id="NXhourglass6" d="M100 100L65.62 67.92V36.78h68.76v31.14z"></path></g><path d="M51.14 38.89h8.33v14.93c0 15.1 8.29 28.99 23.34 39.1 1.88 1.25 3.04 3.97 3.04 7.08s-1.16 5.83-3.04 7.09c-15.05 10.1-23.34 23.99-23.34 39.09v14.93h-8.33a4.859 4.859 0 1 0 0 9.72h97.72a4.859 4.859 0 1 0 0-9.72h-8.33v-14.93c0-15.1-8.29-28.99-23.34-39.09-1.88-1.26-3.04-3.98-3.04-7.09s1.16-5.83 3.04-7.08c15.05-10.11 23.34-24 23.34-39.1V38.89h8.33a4.859 4.859 0 1 0 0-9.72H51.14a4.859 4.859 0 1 0 0 9.72zm79.67 14.93c0 15.87-11.93 26.25-19.04 31.03-4.6 3.08-7.34 8.75-7.34 15.15 0 6.41 2.74 12.07 7.34 15.15 7.11 4.78 19.04 15.16 19.04 31.03v14.93H69.19v-14.93c0-15.87 11.93-26.25 19.04-31.02 4.6-3.09 7.34-8.75 7.34-15.16 0-6.4-2.74-12.07-7.34-15.15-7.11-4.78-19.04-15.16-19.04-31.03V38.89h61.62v14.93z"></path></g></g></svg></div><p id="NotiflixLoadingMessage" class="nx-loading-message" style="color:#dcdcdc;font-size:15px;">Loading...</p></div>
      `;
  
    // Append the loader to the body
    document.body.appendChild(loader);
  }
  
  // Function to hide and remove the loader from the body
  export function hideLoader() {
    const loader = document.getElementById("NotiflixLoadingWrap");
    if (loader) {
      loader.remove(); // Remove the loader element from the DOM
    }
  }
  
  // Loader Ends



  // Modal Starts
// Function to show dynamic modal with content
export function showDynamicModal(
    content: string = "SERVER ERROR !!!",
    title: string = "FAILED",
    status: "success" | "failure" | "warning" | "info"
  ) {
    const icons = {
      success: `
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#32c682" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle">
              <path d="M9 11l3 3L22 4"></path>
              <circle cx="12" cy="12" r="10"></circle>
            </svg>
          `,
      failure: `
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#ff4d4f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          `,
      warning: `
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#ffcc00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          `,
      info: `
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#007bff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          `,
    };
    const icon = icons[status];
    // Create modal HTML with dynamic content
    const modal = document.createElement("div");
    modal.innerHTML = `
        <style>
          #customModal {
            position: fixed;
            z-index: 5000;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
          }
          #customModalContent {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            width: 400px;
            max-width: 90%;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
          }
          #customModalHeader {
            font-size: 18px;
            margin-bottom: 10px;
            font-weight: bold;
            text-align: center;
          }
          #customModalClose {
            float: right;
            cursor: pointer;
            font-size: 16px;
            color: red;
          }
            #customModalBody{
            text-align: center;
            }
              #customModalFooter {
            text-align: center;
          }
          #customModalOkay {
            padding: 6px 16px;
            background-color: #ff6b11;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 5%;
          }
          #customModalOkay:hover {
            background-color: #0056b3;
          }
        </style>
    
        <div id="customModal">
          <div id="customModalContent">
            <div id="customModalHeader">
            ${icon}${title}
              <span id="customModalClose">&times;</span>
            </div>
            <div id="customModalBody">
              ${content}
            </div>
            <div id="customModalFooter">
              <button id="customModalOkay">Okay</button>
            </div>
          </div>
        </div>
      `;
  
    // Append the modal to the body
    document.body.appendChild(modal);
  
    // Get the close button and attach an event listener
    const closeModalButton = modal.querySelector("#customModalClose");
    if (closeModalButton) {
      closeModalButton.addEventListener("click", function () {
        hideDynamicModal();
      });
    }
  
    // Close modal if clicked outside content area
    const modalBackground = modal.querySelector("#customModal");
    if (modalBackground) {
      modalBackground.addEventListener("click", function (event) {
        if (event.target === modalBackground) {
          hideDynamicModal();
        }
      });
    }
  
    // Close the modal when clicking the "Okay" button
    const okayButton = modal.querySelector("#customModalOkay");
    if (okayButton) {
      okayButton.addEventListener("click", function () {
        hideDynamicModal();
      });
    }
  }
  
  // Function to hide the dynamic modal
  export function hideDynamicModal() {
    const modal = document.querySelector("#customModal");
    if (modal) {
      modal.remove(); // Remove the modal from the DOM
    }
  }
  
  // Modal Ends
  
  // Toast starts
  
  export interface Toast {
    content: string;
    classname?: string;
    delay?: number;
  }
  
  export class ToastUtility {
    private toasts: Toast[] = [];
  
    constructor() {
      this.injectStyles(); // Inject the styles when the utility is initialized
    }
  
    // Method to show a new toast
    show(content: string, classname = "", delay = 5000) {
      if (content == "" && classname.includes("bg-danger")) {
        content = "Failed";
      } else if (content == "" && classname.includes("bg-success")) {
        content = "Success";
      } else if (content == "" && classname.includes("bg-warning")) {
        content = "Warning";
      } else if (content == "" && classname.includes("bg-info")) {
        content = "Info";
      }
      const toast: Toast = { content, classname, delay };
      this.toasts.push(toast);
      this.renderToasts();
  
      // Remove the toast after the delay
      setTimeout(() => this.remove(toast), delay);
    }
  
    // Method to remove a toast
    private remove(toast: Toast) {
      this.toasts = this.toasts.filter((t) => t !== toast);
      this.renderToasts();
    }
  
    // Method to clear all toasts
    clear() {
      this.toasts = [];
      this.renderToasts();
    }
  
    // Method to render the toasts in the DOM
    private renderToasts() {
      let toastContainer = document.getElementById("toast-container");
  
      if (!toastContainer) {
        toastContainer = document.createElement("div");
        toastContainer.id = "toast-container";
        toastContainer.className = "toast-container";
        document.body.appendChild(toastContainer);
      }
  
      // Clear existing toasts
      toastContainer.innerHTML = "";
  
      this.toasts.forEach((toast) => {
        const toastElement = document.createElement("div");
        toastElement.className = `toast ${toast.classname}`;
  
        // Define the SVG icon based on toast type
        let icon = "";
        if (toast.classname.includes("bg-success")) {
          icon = `
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          `; // Success SVG
        } else if (toast.classname.includes("bg-danger")) {
          icon = `
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          `; // Error SVG
        } else if (toast.classname.includes("bg-warning")) {
          icon = `
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.29 3.86l-7.86 13A1 1 0 003.14 18h17.72a1 1 0 00.85-1.52l-7.86-13a1 1 0 00-1.7 0zM12 9v4m0 4h.01" />
            </svg>
          `; // Warning SVG
        } else if (toast.classname.includes("bg-info")) {
          icon = `
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 110 20 10 10 0 010-20z" />
            </svg>
          `; // Info SVG
        }
  
        toastElement.innerHTML = `
          <div class="toast-icon">${icon}</div>
          <div class="toast-body">${toast.content}</div>
        `;
  
        toastContainer.appendChild(toastElement);
  
        // Use a small timeout to allow CSS to apply the 'show' class
        setTimeout(() => {
          toastElement.classList.add("show");
        }, 10);
      });
    }
  
    // Method to inject the necessary styles for the toast
    private injectStyles() {
      if (document.getElementById("toast-styles")) return; // Avoid injecting multiple times
  
      const style = document.createElement("style");
      style.id = "toast-styles";
      style.innerHTML = `
        /* Toast container */
        .toast-container {
          position: fixed;
          top: 0;
          right: 0;
          z-index: 99999;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
  
        /* Individual toast */
        .toast {
          min-width: 250px;
          max-width: 400px;
          background-color: #333;
          color: #fff;
          border-radius: 5px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          justify-content: flex-start;
          opacity: 0;  /* Initially hidden */
          transition: opacity 0.5s ease-in-out;  /* Smooth fade-in */
        }
  
        .toast.show {
          opacity: 1; /* Show toast */
        }
  
        /* Toast body */
        .toast-body {
          flex-grow: 1;
          padding-left: 10px;
          font-size: 16px;
          line-height: 1.4;
              color: white;
        }
  
        /* Toast icon */
        .toast-icon {
          font-size: 24px;
          margin-left: 10px;
          display: flex;
          align-items: center;
              color: white;
        }
  
        .toast-icon svg {
          width: 24px;
          height: 24px;
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
        }
  
        /* Custom styles for success, error, warning, and info toasts */
        .bg-success {
          background-color: #28a745;
          color: white;
          border: none;
        }
  
        .bg-danger {
          background-color: #dc3545;
          color: white;
          border: none;
        }
  
        .bg-warning {
          background-color: yellow;
          color: white;
          border: none;
        }
  
        .bg-info {
          background-color: #17a2b8;
          color: white;
          border: none;
        }
      `;
      document.body.appendChild(style);
    }
  }
  
  // Toast Ends
  