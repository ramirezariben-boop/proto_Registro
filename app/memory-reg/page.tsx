import BaseLogPage from "@/components/BaseLogPage";

export default function MemoryReg() {
  return (
    <BaseLogPage
      title="Memorias"
      type="memory"
      placeholder="Escribe anécdotas y recuerdos…"
      heightClass="h-[70vh]"
      buttonText="Guardar memoria"
    />
  );
}
