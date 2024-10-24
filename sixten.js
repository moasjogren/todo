let UI = [
  {
    id: 0,
    task: "noll",
    completed: false,
  },
  {
    id: 1,
    task: "ett",
    completed: false,
  },
];

function toggleItemCompleted(id) {
  UI = UI.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
}

const localUI = {
  get: () => {
    const local = localStorage.getItem("UI");
    if (local) return JSON.parse(local);
    return [];
  },
  set: (UI) => {
    localStorage.setItem("UI", JSON.stringify(UI));
  },
};

toggleItemCompleted(0);

UI = localUI.get();
