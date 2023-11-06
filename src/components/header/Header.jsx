import React from "react";
import "./index.css";
const Header = ({ setConfirmDel, selectId }) => {
  const handleDeleteImg = () => {
    setConfirmDel(true);
  };
  return (
    <div className="gallery-header">
      <div className="selected">
        {selectId.length !== 0 ? (
          <>
            <input type="checkbox" defaultChecked />
            <h3>{selectId.length || 0} Files Selected</h3>
          </>
        ) : (
          <h3>Gallery</h3>
        )}
      </div>
      {selectId.length !== 0 && (
        <button className="delete-button" onClick={handleDeleteImg}>
          Deleted Files
        </button>
      )}
    </div>
  );
};

export default Header;
