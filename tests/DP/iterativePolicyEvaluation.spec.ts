import { expect } from 'chai';
import { DP } from '../../src';
import { SimpleGridWorld } from '../../src/Environments/examples';

describe('Test Iterative Policy Evaluation', () => {
  it('should evaluate equiprobable policy on simple grid world correctly', async () => {
    const width = 4;
    const height = 4;
    const targetPositions = [
      { x: 3, y: 3 },
      { x: 0, y: 0 },
    ];
    const makeEnv = () => {
      return new SimpleGridWorld(width, height, targetPositions, { x: 1, y: 0 });
    };

    // the equiprobable policy
    const policy = () => {
      return 0.25;
    };

    const env = makeEnv();
    const allStateReps: number[] = [];
    for (let x = 0; x < env.width; x++) {
      for (let y = 0; y < env.height; y++) {
        const pos = { x: x, y: y };
        const env = new SimpleGridWorld(width, height, targetPositions, pos);
        const obs = await env.reset();
        allStateReps.push(env.stateToRep(obs));
      }
    }
    const policyEvaluator = new DP.IterativePolicyEvaluation(makeEnv, {
      allStateReps,
      policy,
      allPossibleActions: [0, 1, 2, 3],
    });
    await policyEvaluator.train({
      verbose: false,
      steps: 10,
    });

    const gtVals = [
      0.0,
      -6.14,
      -8.35,
      -8.97,
      -6.14,
      -7.74,
      -8.43,
      -8.35,
      -8.35,
      -8.43,
      -7.74,
      -6.14,
      -8.97,
      -8.35,
      -6.14,
      0.0,
    ];
    for (let i = 0; i <= 15; i++) {
      expect(policyEvaluator.valueFunction.get(i)).to.approximately(gtVals[i], 1e-2);
    }
  });
});
