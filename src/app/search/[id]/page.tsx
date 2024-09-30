import SearchResults from "@/components/mainContent/searchResults/SearchResults";
import React from "react";
import { IPageParams } from "@/types/interfaces";

const page: React.FC<{params: IPageParams}> = ({params}) => {
  return (
    <div>
      <SearchResults id={params.id}/>
    </div>
  );
};

export default page;
