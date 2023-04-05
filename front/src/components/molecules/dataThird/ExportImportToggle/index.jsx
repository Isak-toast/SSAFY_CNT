function ExportImportToggle({ exportImportState, params }) {
  return (
    <>
      {exportImportState ? (
        <div className="inline-flex">
          <div className="bg-blue-300 text-gray-800 font-mun py-2 px-4 rounded-l">
            수출
          </div>
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-mun py-2 px-4 rounded-r">
            수입
          </button>
        </div>
      ) : (
        <div className="inline-flex">
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-mun py-2 px-4 rounded-l">
            수출
          </button>
          <div className="bg-blue-300 text-gray-800 font-mun py-2 px-4 rounded-r">
            수입
          </div>
        </div>
      )}
      <div>{params.nationName}</div>
    </>
  );
}

export default ExportImportToggle;
