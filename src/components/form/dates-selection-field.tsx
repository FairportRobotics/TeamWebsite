import { useFieldContext } from "@/components/form";
import AppFieldLabel from "@/components/form/app-field-label";
import { FieldErrors } from "@/components/form/field-errors";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ChevronDownIcon, Plus, Trash2 } from "lucide-react";
import React from "react";

export type CalendarDate = {
  startAt: Date;
  endAt: Date;
};

interface DatesSelectionFieldProps {
  label: string;
  required?: boolean;
}

export default function DatesSelectionField({ label, required }: DatesSelectionFieldProps) {
  const field = useFieldContext<CalendarDate[]>();

  function handleAddDate(startAt: Date, endAt: Date) {
    let newDates = [...field.state.value, { startAt, endAt }];
    newDates = newDates.sort((a, b) => a.startAt.toISOString().localeCompare(b.endAt.toISOString()));
    field.setValue(newDates);
  }

  function handleRemoveDate(index: number) {
    const newDates = field.state.value.filter((_, i) => i !== index);
    field.setValue(newDates);
  }

  return (
    <div className="">
      <AppFieldLabel fieldName={field.name} label={label} required={required} />
      <div>
        <DateTimeRangePicker dateSelected={(startDate: any, endDate: any) => handleAddDate(startDate, endDate)} />

        <div className="gap-2 flex flex-col mt-4">
          {field.state.value
            .sort((a, b) => a.startAt.toISOString().localeCompare(b.endAt.toISOString()))
            .map((date, index) => (
              <div key={index} className="flex flex-row items-center rounded-md">
                <Button type="button" onClick={() => handleRemoveDate(index)} variant="destructive">
                  <Trash2 className="" />
                </Button>
                <div className="flex flex-row gap-2 ml-4">
                  <span>{date.startAt.toLocaleDateString()}</span>
                  <span>from</span>
                  <span>{date.startAt.toLocaleTimeString()}</span>
                  <span>to</span>
                  <span>{date.endAt.toLocaleTimeString()}</span>
                </div>
              </div>
            ))}
        </div>
      </div>

      <FieldErrors meta={field.state.meta} />
    </div>
  );
}

function DateTimeRangePicker({ dateSelected }: { dateSelected: (startAt: Date, endAt: Date) => void }) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [startAt, setStartAt] = React.useState<string>("18:00");
  const [endAt, setEndAt] = React.useState<string>("21:00");

  function handleAdd() {
    if (!date) return;

    // Build the start and end dates.
    const dateOnly = date?.toISOString().substring(0, 11);
    const startDate = new Date(dateOnly + startAt);
    const endDate = new Date(dateOnly + endAt);

    dateSelected(startDate, endDate);
  }

  return (
    <FieldGroup className="max-w-xs flex-row">
      <Field>
        <FieldLabel htmlFor="date-picker">Date</FieldLabel>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" id="date-picker" className="w-40 justify-between font-normal">
              {date ? format(date, "PPP") : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              defaultMonth={date}
              onSelect={(date) => {
                setDate(date);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </Field>
      <Field className="w-36">
        <FieldLabel htmlFor="time-from">Start Time</FieldLabel>
        <Input
          type="time"
          id="time-from"
          step="60"
          value={startAt}
          onChange={(value) => setStartAt(value.target.value)}
          className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </Field>
      <Field className="w-36">
        <FieldLabel htmlFor="time-through">End Time</FieldLabel>
        <Input
          type="time"
          id="time-through"
          step="60"
          value={endAt}
          onChange={(value) => setEndAt(value.target.value)}
          className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </Field>
      <Field className="items-end justify-end">
        <Button onClick={() => handleAdd()} variant="default" type="button">
          <Plus className="" />
        </Button>
      </Field>
    </FieldGroup>
  );
}
