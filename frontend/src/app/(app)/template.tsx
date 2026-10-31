// Templates remount on every navigation, so each page gets a gentle fade in.
export default function AppTemplate({ children }: { children: React.ReactNode }) {
  return <div className="animate-fade-in">{children}</div>;
}
