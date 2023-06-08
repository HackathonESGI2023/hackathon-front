import {
  Button,
  Card,
  Container,
  Grid,
  Input,
  Spacer,
} from "@nextui-org/react";
import { ActivityType, Event } from "@prisma/client";
import * as React from "react";
import { EventItem } from "./EventItem.component";
import { PencilLine, Trash } from "@phosphor-icons/react";

interface EventsListProps {
  events: Event[];
  crud?: {
    onUpdate: (id: number) => void;
    onDelete: (id: number) => void;
  };
}

export const EventsList: React.FunctionComponent<EventsListProps> = ({
  events,
  crud,
}) => {
  const [filteredEvents, setFilteredEvents] = React.useState(events);

  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    search === ""
      ? setFilteredEvents(
          events.filter((event) =>
            event.name.toLowerCase().includes(search.toLowerCase())
          )
        )
      : setFilteredEvents(events);
  }, [search, events]);

  return (
    <Card
      variant="flat"
      css={{
        backgroundColor: "#fcfcfc",
      }}
    >
      <Card.Body>
        <Input
          placeholder="Rechercher un évènement..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="lg"
          css={{
            marginBottom: "1rem",
          }}
        />
        <Container
          css={{
            overflowY: "auto",
          }}
          gap={0}
        >
          {filteredEvents.map((event) => (
            <Grid.Container
              key={event.id}
              gap={1}
              css={{
                marginBottom: "1rem",
              }}
            >
              <Grid xs={12} md={crud ? 10 : 12}>
                <EventItem
                  key={event.id}
                  activityType={event.activityType}
                  date={event.date}
                  name={event.name}
                />
              </Grid>
              {crud && (
                <Grid xs={12} md={2}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                      alignItems: "center",
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    <Button
                      color={"warning"}
                      icon={<PencilLine size={20} />}
                      auto
                      flat
                      onPress={() => crud.onUpdate(event.id)}
                      css={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    />
                    <Button
                      color="error"
                      onPress={() => crud.onDelete(event.id)}
                      auto
                      flat
                      icon={<Trash size={20} />}
                      css={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    />
                  </div>
                </Grid>
              )}
            </Grid.Container>
          ))}
        </Container>
      </Card.Body>
    </Card>
  );
};
