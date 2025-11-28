import React from "react";
import { ClipLoader } from "react-spinners";

const Loader = ({ loading }) => {
  return (
    <div style={styles.overlay}>
      <ClipLoader color="#36d7b7" loading={loading} size={50} />
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    zIndex: 9999,
  },
};

export default Loader;
