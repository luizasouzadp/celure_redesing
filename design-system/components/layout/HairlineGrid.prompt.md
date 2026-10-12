Lay out any repeating set (stats, cards, steps, people) as gutterless cells divided by 1px white-10 hairlines — Celure's substitute for cards and shadows.
```jsx
<HairlineGrid columns={2} bleed>{trips.map(t => <TripCard key={t.title} {...t} />)}</HairlineGrid>
```
Cells carry their own 2.5rem padding (StatCard, TripCard, JourneyStep do this already).
