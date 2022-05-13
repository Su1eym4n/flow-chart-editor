import "../styles.css";
import {
  Handle,
  Position,
} from "react-flow-renderer";
import {useState} from 'react'
const DynOutputHandle = (props) => {
  const { idx } = props;

  return (
    <Handle
      type={"target"}
      id={`output${idx}`}
      position={Position.Bottom}
      style={{ left: 10 + idx * 20 }}
    />
  );
};

const CustomInputNode = ({data}, props) => {
  const [outputcount, setOutputCount] = useState(1);

  return (
    <>
      <div
        style={{
          border: "1px solid black",
          backgroundColor: "lavender",
          borderRadius: 4,
          padding: 5
        }}
      >
        {data.label}
        <hr />
        <button onClick={() => setOutputCount((i) => i + 1)}>
          {" "}
          Add Port
        </button>
      </div>
      {Array(outputcount)
        .fill(null)
        .map((_, i) => (
          <DynOutputHandle key={i} idx={i} />
        ))}
    </>
  );
};



export default CustomInputNode