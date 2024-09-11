import { SelectIconPark, IconPark } from "jsonlee-ui-react";
// import { SelectIconInstance } from "jsonlee-ui-react/dist/types/selectIconPark";
import "jsonlee-ui-react/dist/styles/style.css";
import { useRef, useState } from "react";

export default function UserManage() {
  const [count, _setCount] = useState(0);
  const selectRef = useRef(null);

  return (
    <div>
      {" "}
      <div>
        <IconPark name={"ACane"} />
        {/* <a href="https://vitejs.dev" target="_blank"></a>
        <a href="https://react.dev" target="_blank"></a> */}
      </div>
      <h1>Vite + React</h1>
      <div>
        <button onClick={() => selectRef.current?.open()}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p>Click on the Vite and React logos to learn more</p>
      <SelectIconPark ref={selectRef} />
    </div>
  );
}
