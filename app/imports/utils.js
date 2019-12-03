import { Tracker } from 'meteor/tracker';
import { Observable } from 'rxjs';

export const ObservableCollection = (query) => {
  const computations = {};

  const subscribe = ({ payload }) => new Observable((observer) => {
    Tracker.autorun(
      async (computation) => {
        computations[payload] = computation;
        observer.next(await query(payload));
      },
      { onError: observer.error },
    );
  });

  const unsubscribe = ({ payload }) => new Observable((observer) => {
    if (computations[payload]) {
      computations[payload].stop();
      observer.complete();
    }
  });

  return { subscribe, unsubscribe };
};

export default { ObservableCollection };
