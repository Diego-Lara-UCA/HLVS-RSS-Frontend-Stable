import React from "react";
import Title from "../../components/title/Title";
import FormCreatePermissions from "../../components/formcreatepermissions/FormCreatePermissions";

const CreatePermission = () => {
  return (
    <div className="container-tab">
      <Title
        title="Create Permission"
        description="Be careful who you let into your home"
      />
      <div>
        <FormCreatePermissions />
      </div>
    </div>
  );
};

export default CreatePermission;
