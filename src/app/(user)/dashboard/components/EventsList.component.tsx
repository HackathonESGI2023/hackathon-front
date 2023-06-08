import { Card, Container, Spacer } from "@nextui-org/react";
import { ActivityType, Event } from "@prisma/client";
import * as React from "react";
import { EventItem } from "./EventItem.component";

interface EventsListProps {
  events: Event[];
}

export const EventsList: React.FunctionComponent<EventsListProps> = ({
  events,
}) => {
  return (
    <Card
      variant="flat"
      css={{
        backgroundColor: "#fcfcfc",
      }}
    >
      <Card.Body
        css={{
          overflowY: "auto",
        }}
      >
        <Container>
          {events.map((event) => (
            <EventItem
              key={event.id}
              activityType={event.activityType}
              date={event.date}
              name={event.name}
            />
          ))}
        </Container>
      </Card.Body>
    </Card>
  );
};
