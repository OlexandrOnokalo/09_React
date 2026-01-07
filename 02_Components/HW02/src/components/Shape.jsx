function Shape({ type, width, height, color }) {
  const style = {
    width: width + "px",
    height: height + "px",
    backgroundColor: color,
    borderRadius: type === "circle" ? "50%" : "0"
  };

  return <div style={style}></div>;
}

export default Shape;
