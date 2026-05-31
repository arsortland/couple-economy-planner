// Created: 2026-01-14 10:00
// v3 - Initial file: useHousehold custom React hook
// Purpose: Manages all household state synced via Firestore.
//   - createHousehold: generates UUID, writes initial document with default expenses
//   - joinHousehold: validates an existing household ID and connects to it
//   - updateData: merges partial updates into the Firestore document
//   - leaveHousehold: clears localStorage and resets local state
//   - Real-time listener: subscribes to Firestore document changes on mount

import { useState, useEffect, useCallback } from "react";
import { doc, onSnapshot, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";

const DEFAULT_EXPENSES = [
  { id: uuidv4(), name: "Huslan", amount: 0 },
  { id: uuidv4(), name: "Husforsikring", amount: 0 },
  { id: uuidv4(), name: "Mat og husholdning", amount: 0 },
  { id: uuidv4(), name: "Barnehage", amount: 0 },
  { id: uuidv4(), name: "Strøm", amount: 0 },
  { id: uuidv4(), name: "Internett", amount: 0 },
  { id: uuidv4(), name: "Renovasjon", amount: 0 },
  { id: uuidv4(), name: "Vann og avløp", amount: 0 },
  { id: uuidv4(), name: "Kommunale avgifter", amount: 0 },
];

export function useHousehold() {
  const [householdId, setHouseholdId] = useState(
    () => localStorage.getItem("householdId") || "",
  );
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!householdId) return;
    setLoading(true);
    const ref = doc(db, "households", householdId);
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setData(snap.data());
      }
      setLoading(false);
    });
    return () => unsub();
  }, [householdId]);

  const createHousehold = useCallback(
    async (nameA, nameB, incomeA, incomeB) => {
      const id = uuidv4();
      const ref = doc(db, "households", id);
      await setDoc(ref, {
        personA: { name: nameA, income: Number(incomeA) },
        personB: { name: nameB, income: Number(incomeB) },
        expenses: DEFAULT_EXPENSES,
      });
      localStorage.setItem("householdId", id);
      setHouseholdId(id);
      return id;
    },
    [],
  );

  const joinHousehold = useCallback(async (id) => {
    const ref = doc(db, "households", id);
    const snap = await getDoc(ref);
    if (!snap.exists()) throw new Error("Household not found");
    localStorage.setItem("householdId", id);
    setHouseholdId(id);
  }, []);

  const updateData = useCallback(
    async (updates) => {
      if (!householdId) return;
      const ref = doc(db, "households", householdId);
      await setDoc(ref, updates, { merge: true });
    },
    [householdId],
  );

  const leaveHousehold = useCallback(() => {
    localStorage.removeItem("householdId");
    setHouseholdId("");
    setData(null);
  }, []);

  return {
    householdId,
    data,
    loading,
    createHousehold,
    joinHousehold,
    updateData,
    leaveHousehold,
  };
}
