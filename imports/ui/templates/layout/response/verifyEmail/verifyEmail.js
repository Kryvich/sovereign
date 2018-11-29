import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { TAPi18n } from 'meteor/tap:i18n';
import { Session } from 'meteor/session';
import { Accounts } from 'meteor/accounts-base';

import './verifyEmail.html';

Template.verifyEmail.rendered = function rendered() {
  Accounts.verifyEmail(Session.get('emailToken'), (error) => {
    if (error) {
      Session.set('verificationResult', error.reason);
    } else {
      Session.set('verificationResult', TAPi18n.__('email-verified'));
      const userId = Meteor.userId();
      Meteor.users.update({ _id: userId }, { $set: { 'emails.0.verified': true } });
    }
  });
};

Template.verifyEmail.helpers({
  verificationResult() {
    return Session.get('verificationResult');
  },
});
