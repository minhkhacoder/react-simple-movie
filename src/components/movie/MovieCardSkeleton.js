/** @format */

import LoadingSkeleton from "../loading/LoadingSkeleton";

export const MovieCardSkeleton = () => {
  return (
    <div className="flex flex-col h-full p-3 text-white rounded-lg select-none movies-card bg-slate-800">
      <LoadingSkeleton
        width="100%"
        height="250px"
        radius="8px"
        className="mb-5"
      ></LoadingSkeleton>
      <div className="flex flex-col flex-1">
        <h3 className="h-full mt-auto mb-3 text-xl font-bold">
          <LoadingSkeleton width="100%" height="20px"></LoadingSkeleton>
        </h3>
        <div className="flex items-center justify-between mb-8 text-sm opacity-50">
          <span>
            <LoadingSkeleton width="50px" height="10px"></LoadingSkeleton>
          </span>
          <span>
            <LoadingSkeleton width="30px" height="10px"></LoadingSkeleton>
          </span>
        </div>
        <LoadingSkeleton
          width="100%"
          height="45px"
          radius="6px"
          className="py-6"
        ></LoadingSkeleton>
      </div>
    </div>
  );
};
