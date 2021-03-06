import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { or, alias, bool } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  @service router
  @service session
  @service layout
  @service currentUser;

  queryParams = ['utm_campaign', 'utm_source', 'utm_medium', 'utm_term', 'utm_content', 'utm_coupon' ,'code']
  utm_campaign = null
  utm_source = null
  utm_medium = null
  utm_term = null
  utm_content = null
  utm_coupon = null
  code = null

  @bool("currentUser.organization") isOrgView;
  

  @computed ('router.currentRouteName')
  get isInsideAttemptRoute () {
    return ['attempt'].includes(this.get('router.currentRouteName')?.split('.')[0])
  }
  @computed ('router.currentRouteName')
  get isInsidePlayer () {
    return ['player'].includes(this.get('router.currentRouteName')?.split('.')[0])
  }

  @or('isInsidePlayer', 'isInsideAttemptRoute') hideNav
  @alias('isInsideAttemptRoute') hideFooter

  @action
  setOutsideContainer(el) {
    this.layout.setOutsideContainer(el)
  }
}