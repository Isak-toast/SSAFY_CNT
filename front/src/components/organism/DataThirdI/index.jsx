import { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ExportImportToggle from "../../molecules/dataThird/ExportImportToggle";
import Table from "../../molecules/dataThirdI/Table";
function DataThirdI(props) {
  const [exportImportState, setExportImportState] = useState(true);
  const params = useParams();

  ///////여기에서 axios 쓴다
  useEffect(() => {
    console.log("세부정보~~~~~~~~~~", params);
  }, [params]);

  const exportImportStateHandler = () => {
    setExportImportState(!exportImportState);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex-start" onClick={exportImportStateHandler}>
          <ExportImportToggle
            exportImportState={exportImportState}
            params={params}
          />
          {/* <Table /> */}
        </div>
      </main>
    </div>
  );
}

export default DataThirdI;
