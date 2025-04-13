import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { X, Camera as FlipCamera2, Slash as Flash, Video, Camera as CameraIcon } from 'lucide-react-native';

type CameraMode = 'photo' | 'video' | 'video-note';

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState<CameraType>(Platform.OS === 'web' ? 'front' : CameraType.back);
  const [flashMode, setFlashMode] = useState<'off' | 'on'>('off');
  const [mode, setMode] = useState<CameraMode>('photo');
  const [error, setError] = useState<string | null>(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      } catch (err) {
        setError('Failed to request camera permissions');
        console.error('Camera permission error:', err);
      }
    })();
  }, []);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (hasPermission === null) {
    return <View style={styles.container} />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No access to camera</Text>
      </View>
    );
  }

  const toggleCameraType = () => {
    setType(current => (
      Platform.OS === 'web' 
        ? (current === 'front' ? 'back' : 'front')
        : (current === CameraType.back ? CameraType.front : CameraType.back)
    ));
  };

  const toggleFlash = () => {
    setFlashMode(current => (current === 'off' ? 'on' : 'off'));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 1,
          base64: false,
        });
        console.log('Photo taken:', photo);
      } catch (err) {
        setError('Failed to take picture');
        console.error('Camera capture error:', err);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={type}
        flashMode={flashMode === 'on' ? 'torch' : 'off'}
      >
        {/* Top Controls */}
        <View style={styles.topControls}>
          <TouchableOpacity style={styles.closeButton}>
            <X size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.flashButton} onPress={toggleFlash}>
            <Flash
              size={24}
              color="white"
              style={flashMode === 'on' ? styles.activeIcon : null}
            />
          </TouchableOpacity>
        </View>

        {/* Bottom Controls */}
        <View style={styles.bottomControls}>
          {/* Camera Modes */}
          <View style={styles.modes}>
            <TouchableOpacity
              style={[styles.modeButton, mode === 'video' && styles.activeMode]}
              onPress={() => setMode('video')}>
              <Video size={20} color="white" />
              <Text style={styles.modeText}>Video</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modeButton, mode === 'photo' && styles.activeMode]}
              onPress={() => setMode('photo')}>
              <CameraIcon size={20} color="white" />
              <Text style={styles.modeText}>Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modeButton, mode === 'video-note' && styles.activeMode]}
              onPress={() => setMode('video-note')}>
              <Video size={20} color="white" />
              <Text style={styles.modeText}>Video note</Text>
            </TouchableOpacity>
          </View>

          {/* Capture Button and Flip Camera */}
          <View style={styles.captureContainer}>
            <View style={styles.captureButtonContainer}>
              <TouchableOpacity
                style={styles.captureButton}
                onPress={takePicture}
              />
            </View>
            <TouchableOpacity
              style={styles.flipButton}
              onPress={toggleCameraType}>
              <FlipCamera2 size={28} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Platform.OS === 'ios' ? 40 : 20,
  },
  closeButton: {
    padding: 8,
  },
  flashButton: {
    padding: 8,
  },
  activeIcon: {
    opacity: 0.8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 50,
  },
  bottomControls: {
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  modes: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  modeButton: {
    alignItems: 'center',
    marginHorizontal: 20,
    opacity: 0.7,
  },
  activeMode: {
    opacity: 1,
  },
  modeText: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
  captureContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  captureButtonContainer: {
    flex: 1,
    alignItems: 'center',
  },
  captureButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'white',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  flipButton: {
    position: 'absolute',
    right: 30,
    padding: 8,
  },
  errorText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    margin: 20,
  },
});