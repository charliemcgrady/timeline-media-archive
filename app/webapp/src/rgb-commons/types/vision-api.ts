// @google-cloud/vision does not have types.
// Modified from https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/gapi.client.vision/index.d.ts

export interface AnnotateImageRequest {
  /** Requested features. */
  features: Feature[];
  /** The image to be processed. */
  image: Image;
  /** Additional context that may accompany the image. */
  imageContext?: ImageContext;
}

export interface AnnotateImageResponse {
  /** If present, crop hints have completed successfully. */
  cropHintsAnnotation?: CropHintsAnnotation;
  /**
   * If set, represents the error message for the operation.
   * Note that filled-in image annotations are guaranteed to be
   * correct, even when `error` is set.
   */
  error?: Status;
  /** If present, face detection has completed successfully. */
  faceAnnotations?: FaceAnnotation[];
  /**
   * If present, text (OCR) detection or document (OCR) text detection has
   * completed successfully.
   * This annotation provides the structural hierarchy for the OCR detected
   * text.
   */
  fullTextAnnotation?: TextAnnotation;
  /** If present, image properties were extracted successfully. */
  imagePropertiesAnnotation?: ImageProperties;
  /** If present, label detection has completed successfully. */
  labelAnnotations?: EntityAnnotation[];
  /** If present, landmark detection has completed successfully. */
  landmarkAnnotations?: EntityAnnotation[];
  /** If present, logo detection has completed successfully. */
  logoAnnotations?: EntityAnnotation[];
  /** If present, safe-search annotation has completed successfully. */
  safeSearchAnnotation?: SafeSearchAnnotation;
  /** If present, text (OCR) detection has completed successfully. */
  textAnnotations?: EntityAnnotation[];
  /** If present, web detection has completed successfully. */
  webDetection?: WebDetection;
}

export interface BatchAnnotateImagesRequest {
  /** Individual image annotation requests for this batch. */
  requests?: AnnotateImageRequest[];
}

export interface BatchAnnotateImagesResponse {
  /** Individual responses to image annotation requests within the batch. */
  responses?: AnnotateImageResponse[];
}

export interface Block {
  /** Detected block type (text, image etc) for this block. */
  blockType?: string;
  /**
   * The bounding box for the block.
   * The vertices are in the order of top-left, top-right, bottom-right,
   * bottom-left. When a rotation of the bounding box is detected the rotation
   * is represented as around the top-left corner as defined when the text is
   * read in the 'natural' orientation.
   * For example:
   * &#42; when the text is horizontal it might look like:
   * 0----1
   * |    |
   * 3----2
   * &#42; when it's rotated 180 degrees around the top-left corner it becomes:
   * 2----3
   * |    |
   * 1----0
   * and the vertice order will still be (0, 1, 2, 3).
   */
  boundingBox?: BoundingPoly;
  /** List of paragraphs in this block (if this blocks is of type text). */
  paragraphs?: Paragraph[];
  /** Additional information detected for the block. */
  property?: TextProperty;
}

export interface BoundingPoly {
  /** The bounding polygon vertices. */
  vertices?: Vertex[];
}

export interface Color {
  /**
   * The fraction of this color that should be applied to the pixel. That is,
   * the final pixel color is defined by the equation:
   *
   * pixel color = alpha &#42; (this color) + (1.0 - alpha) &#42; (background color)
   *
   * This means that a value of 1.0 corresponds to a solid color, whereas
   * a value of 0.0 corresponds to a completely transparent color. This
   * uses a wrapper message rather than a simple float scalar so that it is
   * possible to distinguish between a default value and the value being unset.
   * If omitted, this color object is to be rendered as a solid color
   * (as if the alpha value had been explicitly given with a value of 1.0).
   */
  alpha?: number;
  /** The amount of blue in the color as a value in the interval [0, 1]. */
  blue?: number;
  /** The amount of green in the color as a value in the interval [0, 1]. */
  green?: number;
  /** The amount of red in the color as a value in the interval [0, 1]. */
  red?: number;
}

export interface ColorInfo {
  /** RGB components of the color. */
  color?: Color;
  /**
   * The fraction of pixels the color occupies in the image.
   * Value in range [0, 1].
   */
  pixelFraction?: number;
  /** Image-specific score for this color. Value in range [0, 1]. */
  score?: number;
}

export interface CropHint {
  /**
   * The bounding polygon for the crop region. The coordinates of the bounding
   * box are in the original image's scale, as returned in `ImageParams`.
   */
  boundingPoly?: BoundingPoly;
  /** Confidence of this being a salient region.  Range [0, 1]. */
  confidence?: number;
  /**
   * Fraction of importance of this salient region with respect to the original
   * image.
   */
  importanceFraction?: number;
}

export interface CropHintsAnnotation {
  /** Crop hint results. */
  cropHints?: CropHint[];
}

export interface CropHintsParams {
  /**
   * Aspect ratios in floats, representing the ratio of the width to the height
   * of the image. For example, if the desired aspect ratio is 4/3, the
   * corresponding float value should be 1.33333.  If not specified, the
   * best possible crop is returned. The number of provided aspect ratios is
   * limited to a maximum of 16; any aspect ratios provided after the 16th are
   * ignored.
   */
  aspectRatios?: number[];
}

export interface DetectedBreak {
  /** True if break prepends the element. */
  isPrefix?: boolean;
  /** Detected break type. */
  type?: string;
}

export interface DetectedLanguage {
  /** Confidence of detected language. Range [0, 1]. */
  confidence?: number;
  /**
   * The BCP-47 language code, such as "en-US" or "sr-Latn". For more
   * information, see
   * http://www.unicode.org/reports/tr35/#Unicode_locale_identifier.
   */
  languageCode?: string;
}

export interface DominantColorsAnnotation {
  /** RGB color values with their score and pixel fraction. */
  colors?: ColorInfo[];
}

export interface EntityAnnotation {
  /**
   * Image region to which this entity belongs. Not produced
   * for `LABEL_DETECTION` features.
   */
  boundingPoly?: BoundingPoly;
  /**
   * The accuracy of the entity detection in an image.
   * For example, for an image in which the "Eiffel Tower" entity is detected,
   * this field represents the confidence that there is a tower in the query
   * image. Range [0, 1].
   */
  confidence?: number;
  /** Entity textual description, expressed in its `locale` language. */
  description?: string;
  /**
   * The language code for the locale in which the entity textual
   * `description` is expressed.
   */
  locale?: string;
  /**
   * The location information for the detected entity. Multiple
   * `LocationInfo` elements can be present because one location may
   * indicate the location of the scene in the image, and another location
   * may indicate the location of the place where the image was taken.
   * Location information is usually present for landmarks.
   */
  locations?: LocationInfo[];
  /**
   * Opaque entity ID. Some IDs may be available in
   * [Google Knowledge Graph Search API](https://developers.google.com/knowledge-graph/).
   */
  mid?: string;
  /**
   * Some entities may have optional user-supplied `Property` (name/value)
   * fields, such a score or string that qualifies the entity.
   */
  properties?: Property[];
  /** Overall score of the result. Range [0, 1]. */
  score?: number;
  /**
   * The relevancy of the ICA (Image Content Annotation) label to the
   * image. For example, the relevancy of "tower" is likely higher to an image
   * containing the detected "Eiffel Tower" than to an image containing a
   * detected distant towering building, even though the confidence that
   * there is a tower in each image may be the same. Range [0, 1].
   */
  topicality?: number;
}

export interface FaceAnnotation {
  /** Anger likelihood. */
  angerLikelihood?: string;
  /** Blurred likelihood. */
  blurredLikelihood?: string;
  /**
   * The bounding polygon around the face. The coordinates of the bounding box
   * are in the original image's scale, as returned in `ImageParams`.
   * The bounding box is computed to "frame" the face in accordance with human
   * expectations. It is based on the landmarker results.
   * Note that one or more x and/or y coordinates may not be generated in the
   * `BoundingPoly` (the polygon will be unbounded) if only a partial face
   * appears in the image to be annotated.
   */
  boundingPoly?: BoundingPoly;
  /** Detection confidence. Range [0, 1]. */
  detectionConfidence?: number;
  /**
   * The `fd_bounding_poly` bounding polygon is tighter than the
   * `boundingPoly`, and encloses only the skin part of the face. Typically, it
   * is used to eliminate the face from any image analysis that detects the
   * "amount of skin" visible in an image. It is not based on the
   * landmarker results, only on the initial face detection, hence
   * the <code>fd</code> (face detection) prefix.
   */
  fdBoundingPoly?: BoundingPoly;
  /** Headwear likelihood. */
  headwearLikelihood?: string;
  /** Joy likelihood. */
  joyLikelihood?: string;
  /** Face landmarking confidence. Range [0, 1]. */
  landmarkingConfidence?: number;
  /** Detected face landmarks. */
  landmarks?: Landmark[];
  /**
   * Yaw angle, which indicates the leftward/rightward angle that the face is
   * pointing relative to the vertical plane perpendicular to the image. Range
   * [-180,180].
   */
  panAngle?: number;
  /**
   * Roll angle, which indicates the amount of clockwise/anti-clockwise rotation
   * of the face relative to the image vertical about the axis perpendicular to
   * the face. Range [-180,180].
   */
  rollAngle?: number;
  /** Sorrow likelihood. */
  sorrowLikelihood?: string;
  /** Surprise likelihood. */
  surpriseLikelihood?: string;
  /**
   * Pitch angle, which indicates the upwards/downwards angle that the face is
   * pointing relative to the image's horizontal plane. Range [-180,180].
   */
  tiltAngle?: number;
  /** Under-exposed likelihood. */
  underExposedLikelihood?: string;
}

export interface Feature {
  /** Maximum number of results of this type. */
  maxResults?: number;
  /** The feature type. */
  type?: string;
}

export interface Image {
  /**
   * Image content, represented as a stream of bytes.
   * Note: as with all `bytes` fields, protobuffers use a pure binary
   * representation, whereas JSON representations use base64.
   */
  content?: string;
  /**
   * Google Cloud Storage image location. If both `content` and `source`
   * are provided for an image, `content` takes precedence and is
   * used to perform the image annotation request.
   */
  source?: ImageSource;
}

export interface ImageContext {
  /** Parameters for crop hints annotation request. */
  cropHintsParams?: CropHintsParams;
  /**
   * List of languages to use for TEXT_DETECTION. In most cases, an empty value
   * yields the best results since it enables automatic language detection. For
   * languages based on the Latin alphabet, setting `language_hints` is not
   * needed. In rare cases, when the language of the text in the image is known,
   * setting a hint will help get better results (although it will be a
   * significant hindrance if the hint is wrong). Text detection returns an
   * error if one or more of the specified languages is not one of the
   * [supported languages](/vision/docs/languages).
   */
  languageHints?: string[];
  /** lat/long rectangle that specifies the location of the image. */
  latLongRect?: LatLongRect;
}

export interface ImageProperties {
  /** If present, dominant colors completed successfully. */
  dominantColors?: DominantColorsAnnotation;
}

export interface ImageSource {
  /**
   * NOTE: For new code `image_uri` below is preferred.
   * Google Cloud Storage image URI, which must be in the following form:
   * `gs://bucket_name/object_name` (for details, see
   * [Google Cloud Storage Request
   * URIs](https://cloud.google.com/storage/docs/reference-uris)).
   * NOTE: Cloud Storage object versioning is not supported.
   */
  gcsImageUri?: string;
  /**
   * Image URI which supports:
   * 1) Google Cloud Storage image URI, which must be in the following form:
   * `gs://bucket_name/object_name` (for details, see
   * [Google Cloud Storage Request
   * URIs](https://cloud.google.com/storage/docs/reference-uris)).
   * NOTE: Cloud Storage object versioning is not supported.
   * 2) Publicly accessible image HTTP/HTTPS URL.
   * This is preferred over the legacy `gcs_image_uri` above. When both
   * `gcs_image_uri` and `image_uri` are specified, `image_uri` takes
   * precedence.
   */
  imageUri?: string;
}

export interface Landmark {
  /** Face landmark position. */
  position?: Position;
  /** Face landmark type. */
  type?: string;
}

export interface LatLng {
  /** The latitude in degrees. It must be in the range [-90.0, +90.0]. */
  latitude?: number;
  /** The longitude in degrees. It must be in the range [-180.0, +180.0]. */
  longitude?: number;
}

export interface LatLongRect {
  /** Max lat/long pair. */
  maxLatLng?: LatLng;
  /** Min lat/long pair. */
  minLatLng?: LatLng;
}

export interface LocationInfo {
  /** lat/long location coordinates. */
  latLng?: LatLng;
}

export interface Page {
  /** List of blocks of text, images etc on this page. */
  blocks?: Block[];
  /** Page height in pixels. */
  height?: number;
  /** Additional information detected on the page. */
  property?: TextProperty;
  /** Page width in pixels. */
  width?: number;
}

export interface Paragraph {
  /**
   * The bounding box for the paragraph.
   * The vertices are in the order of top-left, top-right, bottom-right,
   * bottom-left. When a rotation of the bounding box is detected the rotation
   * is represented as around the top-left corner as defined when the text is
   * read in the 'natural' orientation.
   * For example:
   * &#42; when the text is horizontal it might look like:
   * 0----1
   * |    |
   * 3----2
   * &#42; when it's rotated 180 degrees around the top-left corner it becomes:
   * 2----3
   * |    |
   * 1----0
   * and the vertice order will still be (0, 1, 2, 3).
   */
  boundingBox?: BoundingPoly;
  /** Additional information detected for the paragraph. */
  property?: TextProperty;
  /** List of words in this paragraph. */
  words?: Word[];
}

export interface Position {
  /** X coordinate. */
  x?: number;
  /** Y coordinate. */
  y?: number;
  /** Z coordinate (or depth). */
  z?: number;
}

export interface Property {
  /** Name of the property. */
  name?: string;
  /** Value of numeric properties. */
  uint64Value?: string;
  /** Value of the property. */
  value?: string;
}

export interface SafeSearchAnnotation {
  /**
   * Represents the adult content likelihood for the image. Adult content may
   * contain elements such as nudity, pornographic images or cartoons, or
   * sexual activities.
   */
  adult?: string;
  /** Likelihood that this is a medical image. */
  medical?: string;
  /**
   * Spoof likelihood. The likelihood that an modification
   * was made to the image's canonical version to make it appear
   * funny or offensive.
   */
  spoof?: string;
  /** Likelihood that this image contains violent content. */
  violence?: string;
}

export interface Status {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /**
   * A list of messages that carry the error details.  There is a common set of
   * message types for APIs to use.
   */
  details?: Array<Record<string, any>>;
  /**
   * A developer-facing error message, which should be in English. Any
   * user-facing error message should be localized and sent in the
   * google.rpc.Status.details field, or localized by the client.
   */
  message?: string;
}

export interface Symbol {
  /**
   * The bounding box for the symbol.
   * The vertices are in the order of top-left, top-right, bottom-right,
   * bottom-left. When a rotation of the bounding box is detected the rotation
   * is represented as around the top-left corner as defined when the text is
   * read in the 'natural' orientation.
   * For example:
   * &#42; when the text is horizontal it might look like:
   * 0----1
   * |    |
   * 3----2
   * &#42; when it's rotated 180 degrees around the top-left corner it becomes:
   * 2----3
   * |    |
   * 1----0
   * and the vertice order will still be (0, 1, 2, 3).
   */
  boundingBox?: BoundingPoly;
  /** Additional information detected for the symbol. */
  property?: TextProperty;
  /** The actual UTF-8 representation of the symbol. */
  text?: string;
}

export interface TextAnnotation {
  /** List of pages detected by OCR. */
  pages?: Page[];
  /** UTF-8 text detected on the pages. */
  text?: string;
}

export interface TextProperty {
  /** Detected start or end of a text segment. */
  detectedBreak?: DetectedBreak;
  /** A list of detected languages together with confidence. */
  detectedLanguages?: DetectedLanguage[];
}

export interface Vertex {
  /** X coordinate. */
  x?: number;
  /** Y coordinate. */
  y?: number;
}

export interface WebDetection {
  /**
   * Fully matching images from the Internet.
   * Can include resized copies of the query image.
   */
  fullMatchingImages?: WebImage[];
  /** Web pages containing the matching images from the Internet. */
  pagesWithMatchingImages?: WebPage[];
  /**
   * Partial matching images from the Internet.
   * Those images are similar enough to share some key-point features. For
   * example an original image will likely have partial matching for its crops.
   */
  partialMatchingImages?: WebImage[];
  /** The visually similar image results. */
  visuallySimilarImages?: WebImage[];
  /** Deduced entities from similar images on the Internet. */
  webEntities?: WebEntity[];
}

export interface WebEntity {
  /** Canonical description of the entity, in English. */
  description?: string;
  /** Opaque entity ID. */
  entityId?: string;
  /**
   * Overall relevancy score for the entity.
   * Not normalized and not comparable across different image queries.
   */
  score?: number;
}

export interface WebImage {
  /** (Deprecated) Overall relevancy score for the image. */
  score?: number;
  /** The result image URL. */
  url?: string;
}

export interface WebPage {
  /** (Deprecated) Overall relevancy score for the web page. */
  score?: number;
  /** The result web page URL. */
  url?: string;
}

export interface Word {
  /**
   * The bounding box for the word.
   * The vertices are in the order of top-left, top-right, bottom-right,
   * bottom-left. When a rotation of the bounding box is detected the rotation
   * is represented as around the top-left corner as defined when the text is
   * read in the 'natural' orientation.
   * For example:
   * &#42; when the text is horizontal it might look like:
   * 0----1
   * |    |
   * 3----2
   * &#42; when it's rotated 180 degrees around the top-left corner it becomes:
   * 2----3
   * |    |
   * 1----0
   * and the vertice order will still be (0, 1, 2, 3).
   */
  boundingBox?: BoundingPoly;
  /** Additional information detected for the word. */
  property?: TextProperty;
  /**
   * List of symbols in the word.
   * The order of the symbols follows the natural reading order.
   */
  symbols?: Symbol[];
}
