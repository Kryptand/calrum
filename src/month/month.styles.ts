import { css } from "lit-element";

export const style= css`
.day-of-week {
    display: flex;
    width: 100%;
  }
  html,
  body,
  .grid-container {
    height: calc(100vh - 55px);
    margin: 0;
  }

  .grid-container * {
   
    border: 1px solid red;
    position: relative;
  }
  .month-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows:  1fr  1fr  1fr 1fr 1fr 1fr  1fr;
    grid-template-areas: "weeknames weeknames weeknames weeknames weeknames weeknames weeknames" "first-week first-week first-week first-week first-week first-week first-week" "second-week second-week second-week second-week second-week second-week second-week" "third-week third-week third-week third-week third-week third-week third-week" "fourth-week fourth-week fourth-week fourth-week fourth-week fourth-week fourth-week" "fifth-week fifth-week fifth-week fifth-week fifth-week fifth-week fifth-week" "sixth-week sixth-week sixth-week sixth-week sixth-week sixth-week sixth-week";
  }

  .weeknames {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: ". . . . . . .";
    grid-area: weeknames;
  }

  .first-week {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: ;
    grid-template-areas: ". . . . . . .";
    grid-area: first-week;
  }

  .second-week {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: ;
    grid-template-areas: ". . . . . . .";
    grid-area: second-week;
  }

  .third-week {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: ;
    grid-template-areas: ". . . . . . .";
    grid-area: third-week;
  }

  .fourth-week {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: ;
    grid-template-areas: ". . . . . . .";
    grid-area: fourth-week;
  }

  .fifth-week {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: ;
    grid-template-areas: ". . . . . . .";
    grid-area: fifth-week;
  }
  
  .sixth-week {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: ;
    grid-template-areas: ". . . . . . .";
    grid-area: sixth-week;
  }
  #year {
    margin: 5px;
  }
`; 