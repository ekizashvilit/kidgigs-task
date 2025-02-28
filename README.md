# Calendar Event Scheduling App

A mobile scheduling application built with React Native (Expo) that enables users to create, manage, and schedule recurring events.

## Repository

[GitHub Repository](https://github.com/ekizashvilit/kidgigs-task)

## Installation

1. Open the repository
2. Install dependencies: npm install
3. Start the project: npm start

## Features

- **Calendar Interface**: Intuitive calendar view with date selection
- **Event Management**:
  - Create new events with name, time, and repeat options
  - Edit existing events
  - Delete events
  - View events for selected dates
- **Recurring Events**: Support for weekly, bi-weekly, and monthly repeat options
- **Visual Indicators**: Dates with scheduled events are highlighted with dots
- **Data Persistence**: Events are stored locally and retained between app sessions

## Usage

### Calendar Navigation

- The current date is initially selected
- Tap any date to view its scheduled events
- Dates with events are marked with dots

### Managing Events

- Select a date and tap "Create New Event" to create a new event
- Event name is required, other fields have default values
- Set the start and end time for your event
- Choose a repeat option (None, Weekly, Bi-weekly, Monthly)
- Click "Save" to confirm creation
- Select existing events to edit or delete them

### Testing Features

- **Create Past Events**: Generates sample events in the past for testing purposes
  - Note: Users cannot create events in the past, only view them
  - When no past events exist, the app displays "No events were scheduled for {date}"
- **Reset All Events**: Clears all events (both past and future) from the app

## Validation

- Cannot create events in the past
- Cannot create overlapping events (events with conflicting time slots)
- Event name is required

## Technical Implementation

- Built with React Native (Expo)
- State management using Redux
- Compatible with iOS, Android, and Web platforms

## Project Structure

- Components are organized by functionality
- Hooks handle business logic
- Type definitions ensure code reliability
