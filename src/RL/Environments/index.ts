import { Space } from '../Spaces';
export type RenderModes = 'human' | 'ansi' | 'rgb_array';
export abstract class Environment<
  ActionSpace extends Space<Action>,
  ObservationSpace extends Space<State>,
  Action,
  State,
  Reward
> {
  /**
   * Step forward in time by one time step and process the action
   * @param action - the action to perform in the environment
   * @returns the new observed state, reward, and whether a terminal state has been reached (done) and any other info. Specifically return type is
   * {
   *  observation: State,
   *  reward: Reward,
   *  done: boolean,
   *  info: any
   * }
   */
  abstract step(action: Action): { observation: State; reward: Reward; done: boolean; info?: any };

  /**
   * Resets the environment
   */
  abstract reset(): State;

  /**
   * Renders the environment
   * @param mode - The render mode to use. "human" is human readable output rendered to stdout. "ansi" returns a string containing terminal-style text representation. "rgb_array" returns an array representing rgb values per pixel in a image
   */
  abstract render(mode: RenderModes): void;

  /**
   * The dynamics of the environment. Throws an error when called if a environment does not implement this
   * 
   * Mathematically defined as P(s', r | s, a) - the probability of transitioning to state s' from s and receiving reward r after taking action a.
   * 
   * @param sucessorState - s' - the succeeding state
   * @param reward - r - the reward returned upon transitioning to s' from s using action a
   * @param state - s - the preceeding state
   * @param action - a - action a to be taken
   */
  public dynamics(sucessorState: State, reward: number, state: State, action: Action): number {
    throw new Error("Environment dynamics not implemented / provided");
  }

  public abstract actionSpace: ActionSpace;
  public abstract observationSpace: ObservationSpace;
}

export * as Examples from './examples';
