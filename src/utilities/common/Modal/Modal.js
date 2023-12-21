import React, { useEffect } from 'react';
import "./Modal.css";
import dynamics from "dynamics.js";

function Modal() {

    // useEffect(() => {
    //   const btnOpen = document.querySelector(".js-open");
    //   const btnClose = document.querySelector(".js-close");
    //   const modal = document.querySelector(".js-modal");
    //   const modalChildren = modal.children;

    //   function hideModal() {
    //     dynamics.animate(
    //       modal,
    //       {
    //         opacity: 0,
    //         translateY: 100,
    //       },
    //       {
    //         type: dynamics.spring,
    //         frequency: 50,
    //         friction: 600,
    //         duration: 1500,
    //       }
    //     );
    //   }

    //   function showModal() {
    //     dynamics.css(modal, {
    //       opacity: 0,
    //       scale: 0.5,
    //     });

    //     dynamics.animate(
    //       modal,
    //       {
    //         opacity: 1,
    //         scale: 1,
    //       },
    //       {
    //         type: dynamics.spring,
    //         frequency: 300,
    //         friction: 400,
    //         duration: 1000,
    //       }
    //     );
    //   }

    //   function showBtn() {
    //     dynamics.css(btnOpen, {
    //       opacity: 0,
    //     });

    //     dynamics.animate(
    //       btnOpen,
    //       {
    //         opacity: 1,
    //       },
    //       {
    //         type: dynamics.spring,
    //         frequency: 300,
    //         friction: 400,
    //         duration: 800,
    //       }
    //     );
    //   }

    //   function showModalChildren() {
    //     for (let i = 0; i < modalChildren.length; i++) {
    //       const item = modalChildren[i];

    //       dynamics.css(item, {
    //         opacity: 0,
    //         translateY: 30,
    //       });

    //       dynamics.animate(
    //         item,
    //         {
    //           opacity: 1,
    //           translateY: 0,
    //         },
    //         {
    //           type: dynamics.spring,
    //           frequency: 300,
    //           friction: 400,
    //           duration: 1000,
    //           delay: 100 + i * 40,
    //         }
    //       );
    //     }
    //   }

    //   function handleCloseModal() {
    //     hideModal();
    //     dynamics.setTimeout(() => {
    //       toggleClasses();
    //       showBtn();
    //     }, 500);
    //   }

    //   function toggleClasses() {
    //     btnOpen.classList.toggle("is-active");
    //     modal.classList.toggle("is-active");
    //   }

    //   // Open modal when clicking btnOpen
    //   btnOpen.addEventListener("click", function (e) {
    //     toggleClasses();
    //     showModal();
    //     showModalChildren();
    //   });

    //   // Close modal when clicking btnClose
    //   btnClose.addEventListener("click", handleCloseModal);

    //   // Cleanup event listeners on component unmount
    //   return () => {
    //     btnOpen.removeEventListener("click", showModal);
    //     btnClose.removeEventListener("click", handleCloseModal);
    //   };
    // }, []);
  
    return (
    <div className="wrap">
    <div className="modal js-modal">
      <div className="modal-image">
        <svg viewBox="0 0 32 32" style={{ fill: "#48DB71" }}>
          <path d="M1 14 L5 10 L13 18 L27 4 L31 8 L13 26 z"></path>
        </svg>
      </div>
      <h1>Nice job!</h1>
      <p>To dismiss click the button below</p>
      <button className="js-close">Dismiss</button>
    </div>
    </div>
  );
}

export default Modal