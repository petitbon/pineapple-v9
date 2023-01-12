"use client";

import firebase from "../firebase/clientApp";
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import React from "react";
import VoterList from "../components/VoterList";

type VoteDocument = {
  vote: string;
};

export default function Home() {
  const auth = getAuth(firebase);
  // Firestore
  const db = getFirestore(firebase);

  // User Authentication
  const [user, loading, error] = useAuthState(auth);

  // Votes Collection
  const [votes, votesLoading, votesError] = useCollection(
    collection(db, "votes"),
    {}
  );

  const addVoteDocument = async (vote: VoteDocument) => {
    await setDoc(doc(db, "votes", user.uid), vote);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gridGap: 8,
        background:
          "linear-gradient(180deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
      }}
    >
      {loading && <h4>Loading...</h4>}
      {user && (
        <>
          <h1 className="text-3xl mb-6">Pineapple on Pizza?</h1>

          <div className="flex flex-col">
            <button
              className="vote-card"
              onClick={() => addVoteDocument({ vote: "yes" })}
            >
              ✔️🍍🍕
              <h3>
                Pineapple Lovers{" "}
                {
                  votes?.docs?.filter(
                    (doc) => (doc.data() as VoteDocument).vote === "yes"
                  ).length
                }
              </h3>
            </button>
          </div>
          <div style={{ flexDirection: "row", display: "flex" }}>
            <button
              className="vote-card"
              onClick={() => addVoteDocument({ vote: "no" })}
            >
              ❌🍍🍕
              <h3>
                Pineapple Haters{" "}
                {
                  votes?.docs?.filter(
                    (doc) => (doc.data() as VoteDocument).vote === "no"
                  ).length
                }
              </h3>
            </button>
          </div>

          <div style={{ marginTop: "64px" }}>
            <h3 className="text-3xl mb-6">Results</h3>
            <div
              style={{
                maxHeight: "320px",
                overflowY: "auto",
                width: "240px",
              }}
            >
              {votes?.docs?.map((doc) => (
                <VoterList id={doc.id} key={doc.id} vote={doc.data().vote} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
