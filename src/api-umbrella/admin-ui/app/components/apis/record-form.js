import Component from '@ember/component';
// eslint-disable-next-line ember/no-mixins
import Save from 'api-umbrella-admin-ui/mixins/save';
import bootbox from 'bootbox';
import escape from 'lodash-es/escape';

export default Component.extend(Save, {
  init() {
    this._super(...arguments);

    this.backendProtocolOptions = [
      { id: 'http', name: 'http' },
      { id: 'https', name: 'https' },
    ];

    this.balanceAlgorithmOptions = [
      { id: 'least_conn', name: 'Least Connections' },
      { id: 'round_robin', name: 'Round Robin' },
      { id: 'ip_hash', name: 'Source IP Hash' },
    ];
  },

  actions: {
    submit() {
      this.saveRecord({
        transitionToRoute: 'apis',
        message: 'Successfully saved the "' + escape(this.model.name) + '" API backend<br><strong>Note:</strong> Your changes are not yet live. <a href="/admin/#/config/publish">Publish Changes</a> to send your updates live.',
      });
    },

    delete() {
      this.destroyRecord({
        prompt: 'Are you sure you want to delete the API backend "' + escape(this.model.name) + '"?',
        transitionToRoute: 'apis',
        message: 'Successfully deleted the "' + escape(this.model.name) + '" API backend<br><strong>Note:</strong> Your changes are not yet live. <a href="/admin/#/config/publish">Publish Changes</a> to send your updates live.',
      });
    },

    addUrlMatch() {
      this.controllers.apis_url_match_form.add(this.model, 'urlMatches');
      this.send('openModal', 'apis/url_match_form');
    },

    editUrlMatch(urlMatch) {
      this.controllers.apis_url_match_form.edit(this.model, 'urlMatches', urlMatch);
      this.send('openModal', 'apis/url_match_form');
    },

    deleteUrlMatch(urlMatch) {
      this.deleteChildRecord('urlMatches', urlMatch, 'Are you sure you want to remove this URL prefix?');
    },

    addSubSettings() {
      this.controllers.apis_sub_settings_form.add(this.model, 'subSettings');
      this.send('openModal', 'apis/sub_settings_form');
    },

    editSubSettings(subSettings) {
      this.controllers.apis_sub_settings_form.edit(this.model, 'subSettings', subSettings);
      this.send('openModal', 'apis/sub_settings_form');
    },

    deleteSubSettings(subSettings) {
      this.deleteChildRecord('subSettings', subSettings, 'Are you sure you want to remove this URL setting?');
    },

    addRewrite() {
      this.controllers.apis_rewrite_form.add(this.model, 'rewrites');
      this.send('openModal', 'apis/rewrite_form');
    },

    editRewrite(rewrite) {
      this.controllers.apis_rewrite_form.edit(this.model, 'rewrites', rewrite);
      this.send('openModal', 'apis/rewrite_form');
    },

    deleteRewrite(rewrite) {
      this.deleteChildRecord('rewrites', rewrite, 'Are you sure you want to remove this rewrite?');
    },
  },

  deleteChildRecord(collectionName, record, message) {
    let collection = this.model.get(collectionName);
    bootbox.confirm(message, function(result) {
      if(result) {
        collection.removeObject(record);
      }
    });
  },
});
