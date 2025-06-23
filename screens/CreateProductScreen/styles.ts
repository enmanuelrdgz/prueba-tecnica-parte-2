import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
container: {
flex: 1,
 },
header: {
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.1,
shadowRadius: 4,
elevation: 3,
 },
headerGradient: {
paddingHorizontal: 20,
paddingVertical: 16,
borderBottomWidth: 1,
borderBottomColor: '#e5e7eb',
 },
headerTitle: {
fontSize: 28,
fontWeight: 'bold',
color: '#111827',
marginBottom: 4,
 },
headerSubtitle: {
fontSize: 16,
color: '#6b7280',
 },
keyboardAvoid: {
flex: 1,
 },
scrollView: {
flex: 1,
 },
form: {
margin: 16,
borderRadius: 20,
shadowColor: '#8b5cf6',
shadowOffset: { width: 0, height: 4 },
shadowOpacity: 0.1,
shadowRadius: 8,
elevation: 4,
 },
formGradient: {
borderRadius: 20,
padding: 24,
 },
inputContainer: {
marginBottom: 20,
 },
inputLabel: {
fontSize: 14,
fontWeight: '600',
color: '#374151',
marginBottom: 8,
 },
inputWrapper: {
shadowColor: '#8b5cf6',
shadowOffset: { width: 0, height: 2 },
shadowRadius: 4,
elevation: 2,
 },
input: {
backgroundColor: '#ffffff',
borderRadius: 12,
paddingHorizontal: 16,
paddingVertical: 14,
fontSize: 16,
color: '#111827',
 },
textArea: {
height: 100,
paddingTop: 14,
textAlignVertical: 'top',
 },
row: {
flexDirection: 'row',
gap: 12,
 },
halfWidth: {
flex: 1,
 },
categoryContainer: {
marginBottom: 20,
 },
categoryScroll: {
flexGrow: 0,
 },
categoryChip: {
backgroundColor: '#ffffff',
borderWidth: 1,
borderColor: '#e5e7eb',
borderRadius: 20,
marginRight: 8,
overflow: 'hidden',
shadowColor: '#8b5cf6',
shadowOffset: { width: 0, height: 1 },
shadowOpacity: 0.1,
shadowRadius: 2,
elevation: 2,
 },
categoryChipSelected: {
borderColor: '#8b5cf6',
 },
categoryChipGradient: {
paddingHorizontal: 16,
paddingVertical: 10,
 },
categoryChipText: {
fontSize: 14,
color: '#6b7280',
fontWeight: '500',
paddingHorizontal: 16,
paddingVertical: 10,
 },
categoryChipTextSelected: {
fontSize: 14,
color: '#ffffff',
fontWeight: '600',
 },
submitButton: {
borderRadius: 16,
marginTop: 20,
shadowColor: '#8b5cf6',
shadowOffset: { width: 0, height: 4 },
shadowOpacity: 0.3,
shadowRadius: 8,
elevation: 6,
 },
submitButtonDisabled: {
shadowOpacity: 0.1,
 },
submitButtonGradient: {
borderRadius: 16,
paddingVertical: 16,
 },
submitButtonContent: {
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'center',
 },
submitButtonText: {
fontSize: 18,
fontWeight: '600',
color: '#fff',
marginLeft: 8,
 },
 imagePreviewContainer: {
    position: 'relative',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  // Preview de la imagen
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  
  // Botón para eliminar imagen
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 2,
  },
  
  // Contenedor de botones de imagen
  imageButtonsContainer: {
    marginBottom: 16,
  },
  
  // Botón para seleccionar imagen
  imageButton: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  
  // Gradiente del botón de imagen
  imageButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  
  // Texto del botón de imagen
  imageButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
  },
  
  // Contenedor del separador
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  
  // Línea del separador
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  
  // Texto del separador
  separatorText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: '#9ca3af',
    fontWeight: '500',
  },
});