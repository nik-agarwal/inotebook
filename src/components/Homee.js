import Notes from "./Notes";
export const Homee = (props) => {
 const {showAlert} =props;
  return (
    <div>
      <Notes showAlert={showAlert} />
    </div>
  );
};

export default Homee;
