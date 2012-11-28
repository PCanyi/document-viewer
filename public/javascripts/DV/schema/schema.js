DV.Schema = function() {
  this.models       = {};
  this.views        = {};
  this.states       = {};
  this.helpers      = {};
  this.events       = {};
  this.elements     = {};
  this.text         = {};
  this.data         = {
    zoomLevel               : 700,
    pageWidthPadding        : 20,
    additionalPaddingOnPage : 30,
    state                   : { page: { previous: 0, current: 0, next: 1 } }
  };
};

// Imports the document's JSON representation into the DV.Schema form that
// the models expect.
DV.Schema.prototype.importCanonicalDocument = function(json) {
  // Ensure that IDs start with 1 as the lowest id.
  _.uniqueId();
  // Ensure at least empty arrays for sections.
  json.sections               = _.sortBy(json.sections || [], function(sec){ return sec.page; });
  json.annotations            = json.annotations || [];
  json.canonicalURL           = json.canonical_url;

  this.document               = DV.jQuery.extend(true, {}, json);
  // Everything after this line is for back-compatibility.
  this.data.title             = json.title;
  this.data.totalPages        = json.pages;
  this.data.totalAnnotations  = json.annotations.length;
  this.data.sections          = json.sections;
  this.data.chapters          = [];
  this.data.annotationsById   = {};
  this.data.annotationsByPage = {};
  _.each(json.annotations, DV.jQuery.proxy(this.loadAnnotation, this));
};

// Load an annotation into the Schema, starting from the canonical format.
DV.Schema.prototype.loadAnnotation = function(anno) {
  //if (anno.id) anno.server_id = anno.id;
  //var idx     = anno.page - 1;
  //anno.id     = anno.id || _.uniqueId();
  //anno.title  = anno.title || 'Untitled Note';
  //anno.text   = anno.content || '';
  //anno.access = anno.access || 'public';
  //anno.type   = anno.location && anno.location.image ? 'region' : 'page';
  //if (anno.type === 'region') {
  //  var loc = DV.jQuery.map(anno.location.image.split(','), function(n, i) { return parseInt(n, 10); });
  //  anno.y1 = loc[0]; anno.x2 = loc[1]; anno.y2 = loc[2]; anno.x1 = loc[3];
  //}else if(anno.type === 'page'){
  //  anno.y1 = 0; anno.x2 = 0; anno.y2 = 0; anno.x1 = 0;
  //}
  //// insert note keyed by it's id into the annotationsById object.
  //this.data.annotationsById[anno.id] = anno;
  //
  //// fetch (or initialize) the appropriate page of notes for the current note.
  //// Then insert the note into the page of notes according to its distance from the top of the page.
  //var page = this.data.annotationsByPage[idx] = this.data.annotationsByPage[idx] || [];
  //var insertionIndex = _.sortedIndex(page, anno, function(a){ return a.y1; });
  //page.splice(insertionIndex, 0, anno);
  //
  //return anno;
};
