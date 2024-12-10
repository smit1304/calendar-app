import { CalendarEvent } from '@schedule-x/calendar';

export default function CalendarEventComponent({ CalendarEvent }) {
  return (
    <div>
      <span>{CalendarEvent.title}</span>

      {CalendarEvent.status === 'todo' && <> !!</>}
      {CalendarEvent.status === 'done' && <>✔️</>}
    </div>
  );
}
