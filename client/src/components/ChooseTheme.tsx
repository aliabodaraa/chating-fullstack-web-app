import { useTheme } from "../contexts/ThemesProvider";
const ChooseTheme = () => {
  console.log("ChooseTheme");
  let { setTheme } = useTheme();
  return (
    <>
      <h6>Select your preferred Theme :</h6>
      <div className="d-flex justify-content-between">
        <div
          onClick={() => setTheme("danger")}
          style={{
            borderRadius: "100%",
            width: "30px",
            height: "30px",
            backgroundColor: "red",
          }}
        ></div>
        <div
          onClick={() => setTheme("success")}
          style={{
            borderRadius: "100%",
            width: "30px",
            height: "30px",
            backgroundColor: "green",
          }}
        ></div>
        <div
          onClick={() => setTheme("warning")}
          style={{
            borderRadius: "100%",
            width: "30px",
            height: "30px",
            backgroundColor: "yellow",
          }}
        ></div>
        <div
          onClick={() => setTheme("primary")}
          style={{
            borderRadius: "100%",
            width: "30px",
            height: "30px",
            backgroundColor: "blue",
          }}
        ></div>
        <div
          onClick={() => setTheme("secondary")}
          style={{
            borderRadius: "100%",
            width: "30px",
            height: "30px",
            backgroundColor: "grey",
          }}
        ></div>
      </div>
    </>
  );
};

export default ChooseTheme;
