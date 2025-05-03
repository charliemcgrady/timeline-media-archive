import React, { FunctionComponent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "~/redux/store";
import { tagActions } from "~/redux/actions";
import LoadingSpinner from "~/components/pure/affordances/LoadingSpinner";
import EditTagsNav from "./EditTagsNav";
import AddTag from "./AddTag";
import SelectTag from "./SelectTag";
import DeleteTag from "./DeleteTag";
import SelectMediaForTag from "./SelectMediaForTag";
import { useSyncedTagMap } from "./useSyncedTagMap";

const EditTags: FunctionComponent<{}> = () => {
  const dispatch = useDispatch();
  const { fetchLoading } = useSelector(
    (state: AppState) => state.userData.tags
  );

  const [activeTagId, setActiveTagId] = useState<string | undefined>(undefined);

  useEffect(() => {
    dispatch(tagActions.fetchTags());
  }, []);

  const tagMap = useSyncedTagMap();

  return (
    <EditTagsNav>
      {fetchLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <AddTag />
          <SelectTag {...{ activeTagId, setActiveTagId, tagMap }} />
          <DeleteTag {...{ activeTagId, setActiveTagId, tagMap }} />
          <SelectMediaForTag {...{ activeTagId, tagMap }} />
        </>
      )}
    </EditTagsNav>
  );
};

export default EditTags;
