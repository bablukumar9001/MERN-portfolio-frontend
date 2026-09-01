import { useRef } from "react";
import { toast } from "react-toastify";
import { adminFetch } from "../../api";

// HTML5 drag-and-drop reordering for admin list rows.
// Usage:
//   const { rowProps, dragging } = useDragReorder(items, setItems, "projects");
//   <tr {...rowProps(index)}>…</tr>
export default function useDragReorder(items, setItems, resource) {
  const from = useRef(null);

  const onDragStart = (i) => (e) => {
    from.current = i;
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (i) => (e) => {
    e.preventDefault();
    if (from.current === null || from.current === i) return;
    const next = [...items];
    const [moved] = next.splice(from.current, 1);
    next.splice(i, 0, moved);
    from.current = i;
    setItems(next);
  };

  const onDrop = async () => {
    if (from.current === null) return;
    from.current = null;
    try {
      await adminFetch(`/api/admin/${resource}/reorder`, {
        method: "PATCH",
        body: JSON.stringify({ ids: items.map((x) => x._id) }),
      });
      toast.success("Order saved");
    } catch (e) {
      toast.error(e.message || "Could not save order");
    }
  };

  const rowProps = (i) => ({
    draggable: true,
    onDragStart: onDragStart(i),
    onDragOver: onDragOver(i),
    onDrop,
    style: { cursor: "grab" },
  });

  return { rowProps };
}
