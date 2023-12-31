import React from "react";

function TestBox({ children, ...props }) {
  return (
    <div style={{ overflow: "visible", width: "20em", lineBreak: "auto", whiteSpace: "break-spaces"}}>
       <svg
        width="content"
        height="content"
        viewBox={`0 0 301 356`}
        // preserveAspectRatio="xMidYMid slice"
        {...props}
      >
        <mask id="path-1-inside-1_183_1275" fill="white">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 0H286V4L294 4L290 4V8L294 8V12H298V343H294V347H290V351H286V355H12V351H8L8 347H4V343H0V12H4V8L8 8L8 4L4 4L12 4V0Z"
          />
        </mask>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 0H286V4L294 4L290 4V8L294 8V12H298V343H294V347H290V351H286V355H12V351H8L8 347H4V343H0V12H4V8L8 8L8 4L4 4L12 4V0Z"
          fill="#FFFFF3"
        />
        <path
          d="M286 0H287V-1H286V0ZM12 0V-1H11V0H12ZM286 4H285V5L286 5L286 4ZM290 4L290 3L289 3V4H290ZM290 8H289V9L290 9L290 8ZM294 8H295V7L294 7L294 8ZM294 12H293V13H294V12ZM298 12H299V11H298V12ZM298 343V344H299V343H298ZM294 343V342H293V343H294ZM294 347V348H295V347H294ZM290 347V346H289V347H290ZM290 351V352H291V351H290ZM286 351V350H285V351H286ZM286 355V356H287V355H286ZM12 355H11V356H12V355ZM12 351H13V350H12V351ZM8 351L7 351L7 352H8V351ZM8 347L9 347L9 346H8V347ZM4 347H3V348H4V347ZM4 343H5V342H4V343ZM0 343H-1V344H0V343ZM0 12V11H-1V12H0ZM4 12V13H5V12H4ZM4 8L4 7L3 7V8H4ZM8 8L8 9L9 9L9 8L8 8ZM8 4L9 4L9 3L8 3L8 4ZM12 4L12 5L13 5V4H12ZM286 -1H12V1H286V-1ZM287 4V0H285V4H287ZM294 3L286 3L286 5L294 5L294 3ZM290 5L294 5L294 3L290 3L290 5ZM291 8V4H289V8H291ZM294 7L290 7L290 9L294 9L294 7ZM295 12V8H293V12H295ZM298 11H294V13H298V11ZM299 343V12H297V343H299ZM294 344H298V342H294V344ZM295 347V343H293V347H295ZM290 348H294V346H290V348ZM291 351V347H289V351H291ZM286 352H290V350H286V352ZM287 355V351H285V355H287ZM12 356H286V354H12V356ZM11 351V355H13V351H11ZM8 352H12V350H8V352ZM7 347L7 351L9 351L9 347L7 347ZM4 348H8V346H4V348ZM3 343V347H5V343H3ZM0 344H4V342H0V344ZM-1 12V343H1V12H-1ZM4 11H0V13H4V11ZM3 8V12H5V8H3ZM8 7L4 7L4 9L8 9L8 7ZM7 4L7 8L9 8L9 4L7 4ZM4 5L8 5L8 3L4 3L4 5ZM12 3L4 3L4 5L12 5L12 3ZM11 0V4H13V0H11Z"
          fill="#FFB571"
          mask="url(#path-1-inside-1_183_1275)"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M289 1H286V4H289V1ZM293 5H290V8H293V5ZM294 9H297V12H294V9ZM301 13H298V343H294V344V347H290V348V351H286V352V355H15V356H289V355V352H293V351V348H297V347V344H301V343V13ZM4 343H3V344H4V343ZM7 347H8V348H7V347ZM12 351H11V352H12V351Z"
          fill="#D38842"
        />
        <foreignObject x="12%" y="10%" width="80%" height="90%">
          <div style={{textAlign: 'center', fontSize: '20px'}}>
            {children}
          </div>
        </foreignObject>
      </svg>
    </div>
  );
}

export default TestBox;

// import React from "react";

// function TestBox({ children, ...props }) {

//   return (
//     <div style={{ overflow: "visible", width: "15em", lineBreak: "auto", whiteSpace: "break-spaces"}}>
//       <svg
//         width="content"
//         height="content"
//         viewBox={`0 0 301 356`}
//         // preserveAspectRatio="xMidYMid slice"
//         {...props}
//       >
//         <mask id="path-1-inside-1_183_1275" fill="white">
//           <path
//             fill-rule="evenodd"
//             clip-rule="evenodd"
//             d="M12 0H286V4L294 4L290 4V8L294 8V12H298V343H294V347H290V351H286V355H12V351H8L8 347H4V343H0V12H4V8L8 8L8 4L4 4L12 4V0Z"
//           />
//         </mask>
//         <path
//           fill-rule="evenodd"
//           clip-rule="evenodd"
//           d="M12 0H286V4L294 4L290 4V8L294 8V12H298V343H294V347H290V351H286V355H12V351H8L8 347H4V343H0V12H4V8L8 8L8 4L4 4L12 4V0Z"
//           fill="#FFFFF3"
//         />
//         <path
//           d="M286 0H287V-1H286V0ZM12 0V-1H11V0H12ZM286 4H285V5L286 5L286 4ZM290 4L290 3L289 3V4H290ZM290 8H289V9L290 9L290 8ZM294 8H295V7L294 7L294 8ZM294 12H293V13H294V12ZM298 12H299V11H298V12ZM298 343V344H299V343H298ZM294 343V342H293V343H294ZM294 347V348H295V347H294ZM290 347V346H289V347H290ZM290 351V352H291V351H290ZM286 351V350H285V351H286ZM286 355V356H287V355H286ZM12 355H11V356H12V355ZM12 351H13V350H12V351ZM8 351L7 351L7 352H8V351ZM8 347L9 347L9 346H8V347ZM4 347H3V348H4V347ZM4 343H5V342H4V343ZM0 343H-1V344H0V343ZM0 12V11H-1V12H0ZM4 12V13H5V12H4ZM4 8L4 7L3 7V8H4ZM8 8L8 9L9 9L9 8L8 8ZM8 4L9 4L9 3L8 3L8 4ZM12 4L12 5L13 5V4H12ZM286 -1H12V1H286V-1ZM287 4V0H285V4H287ZM294 3L286 3L286 5L294 5L294 3ZM290 5L294 5L294 3L290 3L290 5ZM291 8V4H289V8H291ZM294 7L290 7L290 9L294 9L294 7ZM295 12V8H293V12H295ZM298 11H294V13H298V11ZM299 343V12H297V343H299ZM294 344H298V342H294V344ZM295 347V343H293V347H295ZM290 348H294V346H290V348ZM291 351V347H289V351H291ZM286 352H290V350H286V352ZM287 355V351H285V355H287ZM12 356H286V354H12V356ZM11 351V355H13V351H11ZM8 352H12V350H8V352ZM7 347L7 351L9 351L9 347L7 347ZM4 348H8V346H4V348ZM3 343V347H5V343H3ZM0 344H4V342H0V344ZM-1 12V343H1V12H-1ZM4 11H0V13H4V11ZM3 8V12H5V8H3ZM8 7L4 7L4 9L8 9L8 7ZM7 4L7 8L9 8L9 4L7 4ZM4 5L8 5L8 3L4 3L4 5ZM12 3L4 3L4 5L12 5L12 3ZM11 0V4H13V0H11Z"
//           fill="#FFB571"
//           mask="url(#path-1-inside-1_183_1275)"
//         />
//         <path
//           fill-rule="evenodd"
//           clip-rule="evenodd"
//           d="M289 1H286V4H289V1ZM293 5H290V8H293V5ZM294 9H297V12H294V9ZM301 13H298V343H294V344V347H290V348V351H286V352V355H15V356H289V355V352H293V351V348H297V347V344H301V343V13ZM4 343H3V344H4V343ZM7 347H8V348H7V347ZM12 351H11V352H12V351Z"
//           fill="#D38842"
//         />
//         <text x="50%" y="50%" textAnchor="middle" dy=".3em">
//             {children}
//         </text>
//       </svg>
      
//     </div>
//   );
// }

// export default TestBox;
