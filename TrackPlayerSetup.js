import TrackPlayer, {
  Capability
} from 'react-native-track-player';

export async function setupTrackPlayer() {
  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],
      compactCapabilities: [Capability.Play, Capability.Pause],
    });

    console.log('Track Player has been set up.');
  } catch (error) {
    console.log('Track Player has an ERROR.');
    console.log(error);
  }
}
