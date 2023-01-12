"use client";

import React, { ReactElement } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import firebase from "../firebase/clientApp";
import { getFirestore, doc } from "firebase/firestore";
import Image from "next/image";

interface Props {
  // id is the id of the vote document
  // (which is also the uid of the user, and the name of the user doucment for that user)
  id: string;
  vote: string;
}

function VoterList({ id, vote }: Props): ReactElement {
  // Firestore
  const db = getFirestore(firebase);

  const [value, loading, error] = useDocument(doc(db, `users/${id}`));

  if (loading) {
    return <h6>Loading...</h6>;
  }

  if (error) {
    return null;
  }

  return (
    <div className="max-w-[320px] flex items-center m-4">
      <Image
        width="35"
        height="35"
        className="border-0 mt-1 mr-4 rounded-full"
        src={value?.data()?.photoURL}
        alt={value?.data()?.uid}
      />
      <div>
        <h4 style={{ marginBottom: 0 }}>{value?.data()?.displayName}</h4>
        <h4 className="mt-0 text-2xl" style={{ marginTop: 0 }}>
          Voted {vote === "yes" ? "✔️🍍" : "❌🍍"}
        </h4>
      </div>
    </div>
  );
}

export default VoterList;
