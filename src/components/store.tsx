"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { Workout } from "@/lib/types";

type StoreContextType = {
  plan: Workout[];
  saved: Workout[];

  toast: string | null;

  addPlan: (workout: Workout) => void;
  removePlan: (id: string) => void;

  addSaved: (workout: Workout) => void;
  removeSaved: (id: string) => void;

  markDone: (id: string) => void;
};

const StoreContext = createContext<StoreContextType | undefined>(
  undefined
);

export function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  useEffect(() => {
    const storedPlan = localStorage.getItem("fitlog-plan");
    const storedSaved = localStorage.getItem("fitlog-saved");

    if (storedPlan) {
      setPlan(JSON.parse(storedPlan));
    }

    if (storedSaved) {
      setSaved(JSON.parse(storedSaved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved]);

  useEffect(() => {
    return () => {
      if (toastTimer.current) {
        clearTimeout(toastTimer.current);
      }
    };
  }, []);

  function showToast(message: string) {
    setToast(message);

    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }

    toastTimer.current = setTimeout(() => {
      setToast(null);
      toastTimer.current = null;
    }, 2500);
  }

  function addPlan(workout: Workout) {
    if (plan.length >= 5) {
      showToast("Today's plan is full.");
      return;
    }

    if (plan.some((item) => item.id === workout.id)) {
      showToast("Already in today's plan.");
      return;
    }

    setPlan((current) => [...current, workout]);

    showToast(`${workout.name} added to today's plan.`);
  }

  function removePlan(id: string) {
    const workout = plan.find(
      (item) => item.id === id
    );

    setPlan((current) =>
      current.filter((item) => item.id !== id)
    );

    if (workout) {
      showToast(`${workout.name} removed from plan.`);
    }
  }

  function addSaved(workout: Workout) {
    if (
      saved.some((item) => item.id === workout.id)
    ) {
      showToast("Already saved.");
      return;
    }

    setSaved((current) => [...current, workout]);

    showToast(`${workout.name} saved for later.`);
  }

  function removeSaved(id: string) {
    const workout = saved.find(
      (item) => item.id === id
    );

    setSaved((current) =>
      current.filter((item) => item.id !== id)
    );

    if (workout) {
      showToast(`${workout.name} removed from saved.`);
    }
  }

  function markDone(id: string) {
    const workout = plan.find(
      (item) => item.id === id
    );

    setPlan((current) =>
      current.filter((item) => item.id !== id)
    );

    if (workout) {
      showToast(`${workout.name} marked as done.`);
    }
  }

  return (
    <StoreContext.Provider
      value={{
        plan,
        saved,
        toast,
        addPlan,
        removePlan,
        addSaved,
        removeSaved,
        markDone,
      }}
    >
      {children}

      {toast && (
        <div
          className="toast-fitlog"
          role="status"
          aria-live="polite"
        >
          {toast}
        </div>
      )}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error(
      "useStore must be used inside StoreProvider"
    );
  }

  return context;
}