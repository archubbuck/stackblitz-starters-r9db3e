import { inject, Injectable } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';

import { Analyst } from '@models/analyst';
import Currency from '@models/structures/Currency';
import InvestmentTeam from '@models/structures/InvestmentTeam';
import { Region } from '@models/structures/InvestmentTeam';

import { GraphUser } from '../graph/graph-user';
import { Permission } from '../permission/permission';
import { User } from './user';

import { NGXLogger } from 'ngx-logger';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { Role } from 'src/app/models/role';
import Perspective from 'src/app/models/structures/Perspective';

export const themes = ['default', 'compact'] as const;
export type Theme = typeof themes[number];

export const modes = ['light', 'dark'] as const;
export type Mode = typeof modes[number];

@Injectable({
  providedIn: 'root',
})
export class UserService {
  logger = inject(NGXLogger);

  /**
   * Used internally by {@link setPerspective$} to send a value to subscribers of the {@link perspective$} observable.
   *
   * @private
   */
  private _perspective$ = new ReplaySubject<Perspective>(1);

  /**
   * Subscribe to begin streaming the latest value that was pushed to the {@link _perspective$} subject.
   *
   * @public
   */
  public readonly perspective$ = this._perspective$.asObservable();

  /**
   * Sends an instance of the {@link Perspective} object to those subscribed to the {@link perspective$} observable.
   *
   * @public
   * @param {Perspective} value
   */
  public setPerspective$(value: Perspective) {
    this.logger.debug(
      `Setting the user's perspective to ${JSON.stringify(value, null)}`
    );
    this._perspective$.next(value);
  }

  /**
   * Used internally by {@link setInvestmentTeam$} to send a value to subscribers of the {@link investmentTeam$} observable.
   *
   * @private
   */
  private _investmentTeam$ = new ReplaySubject<InvestmentTeam>(1);

  /**
   * Subscribe to begin streaming the latest value that was pushed to the {@link _investmentTeam$} subject.
   *
   * @public
   */
  public readonly investmentTeam$ = this._investmentTeam$.asObservable();

  /**
   * Sends an instance of the {@link InvestmentTeam} object to those subscribed to the {@link investmentTeam$} observable.
   *
   * @public
   * @param {InvestmentTeam} value
   */
  public setInvestmentTeam$(value: InvestmentTeam) {
    this.logger.debug(
      `Setting the user's investment team to ${JSON.stringify(value, null)}`
    );
    this._investmentTeam$.next(value);
  }

  /**
   * The default value to be used by the {@link _currency$} subject when initialized.
   *
   * @private
   */
  private DEFAULT_CURRENCY: Currency = {
    id: 'USD',
    name: 'United States Dollar',
  } as const;

  /**
   * Used internally by {@link setCurrency$} to send a value to subscribers of the {@link currency$} observable.
   *
   * @private
   */
  private _currency$ = new BehaviorSubject<Currency>(this.DEFAULT_CURRENCY);

  /**
   * Subscribe to begin streaming the latest value that was pushed to the {@link _currency$} subject.
   *
   * @public
   */
  public readonly currency$ = this._currency$.asObservable();

  /**
   * Sends an instance of the {@link Currency} object to those subscribed to the {@link currency$} observable.
   *
   * @public
   * @param {InvestmentTeam} value
   */
  public setCurrency$(value: Currency) {
    this.logger.debug(
      `Setting the user's currency to ${JSON.stringify(value, null)}`
    );
    this._currency$.next(value);
  }

  /**
   * Used internally by {@link setRegion$} to send a value to subscribers of the {@link region$} observable.
   *
   * @private
   */
  private _region$ = new ReplaySubject<Region | undefined>(1);

  /**
   * Subscribe to begin streaming the latest value that was pushed to the {@link _region$} subject.
   *
   * @public
   */
  public readonly region$ = this._region$.asObservable();

  /**
   * Sends an instance of the {@link Region} object to those subscribed to the {@link region$} observable.
   *
   * @public
   * @param {InvestmentTeam} value
   */
  public setRegion$(value?: Region) {
    this.logger.debug(
      `Setting the user's region to ${JSON.stringify(value, null)}`
    );
    this._region$.next(value);
  }

  /**
   * The default value to be used by the {@link _theme$} subject when initialized.
   *
   * @private
   */
  private DEFAULT_THEME: Theme = 'default' as const;

  /**
   * Used internally by {@link setTheme$} to send a value to subscribers of the {@link theme$} observable.
   *
   * @private
   */
  private _theme$ = new BehaviorSubject<Theme>(this.DEFAULT_THEME);

  /**
   * Subscribe to begin streaming the latest value that was pushed to the {@link _theme$} subject.
   *
   * @public
   */
  public readonly theme$ = this._theme$.asObservable();

  /**
   * Sends an instance of the {@link Theme} object to those subscribed to the {@link theme$} observable.
   *
   * @public
   * @param {Theme} value
   */
  public setTheme$(value: Theme) {
    this.logger.debug(
      `Setting the user's theme to ${JSON.stringify(value, null)}`
    );
    this._theme$.next(value);
  }

  /**
   * The default value to be used by the {@link _mode$} when initialized.
   *
   * @private
   */
  private DEFAULT_MODE: Mode = 'light' as const;

  /**
   * Used internally by {@link setMode$} to send a value to subscribers of the {@link mode$} observable.
   *
   * @private
   */
  private _mode$ = new BehaviorSubject<Mode>(this.DEFAULT_MODE);

  /**
   * Subscribe to begin streaming the latest value that was pushed to the {@link _mode$} subject.
   *
   * @public
   */
  public readonly mode$ = this._mode$.asObservable();

  /**
   * Sends an instance of the {@link Mode} object to those subscribed to the {@link mode$} observable.
   *
   * @public
   * @param {Mode} value
   */
  public setMode$(value: Mode) {
    this.logger.debug(
      `Setting the user's mode to ${JSON.stringify(value, null)}`
    );
    this._mode$.next(value);
  }

  /**
   * Used internally by {@link setIdentity$} to send a value to subscribers of the {@link identity$} observable.
   *
   * @private
   */
  private _identity$ = new ReplaySubject<GraphUser>(1);

  /**
   * Subscribe to begin streaming the latest value that was pushed to the {@link _identity$} subject.
   *
   * @public
   */
  public readonly identity$ = this._identity$.asObservable();

  /**
   * Sends an instance of the {@link GraphUser} object to those subscribed to the {@link identity$} observable.
   *
   * @public
   * @param {GraphUser} value
   */
  public setIdentity$(value: GraphUser) {
    this.logger.debug(
      `Setting the user's identity to ${JSON.stringify(value, null)}`
    );
    this._identity$.next(value);
  }

  /**
   * Used internally by {@link setProfileImage$} to send a value to subscribers of the {@link profileImage$} observable.
   *
   * @private
   */
  private _profileImage$ = new ReplaySubject<SafeResourceUrl>(1);

  /**
   * Subscribe to begin streaming the latest value that was pushed to the {@link _profileImage$} subject.
   *
   * @public
   */
  public profileImage$ = this._profileImage$.asObservable();

  /**
   * Sends an instance of the {@link SafeResourceUrl} object to those subscribed to the {@link profileImage$} observable.
   *
   * @public
   * @param {SafeResourceUrl} value
   */
  public setProfileImage$(value: SafeResourceUrl) {
    this.logger.debug(
      `Setting the user's profile image to ${JSON.stringify(value, null)}`
    );
    this._profileImage$.next(value);
  }

  /**
   * Used internally by {@link setProfile$} to send a value to subscribers of the {@link profile$} observable.
   *
   * @private
   */
  private _profile$ = new ReplaySubject<Analyst>(1);

  /**
   * Subscribe to begin streaming the latest value that was pushed to the {@link _profile$} subject.
   *
   * @public
   */
  public profile$ = this._profile$.asObservable();

  /**
   * Sends an instance of the {@link Analyst} object to those subscribed to the {@link profile$} observable.
   *
   * @public
   * @param {Analyst} value
   */
  public setProfile$(value: Analyst) {
    this.logger.debug(
      `Setting the user's profile to ${JSON.stringify(value, null)}`
    );
    this._profile$.next(value);
  }

  /**
   * Used internally by {@link setRoles$} to send a value to subscribers of the {@link permissions$} observable.
   *
   * @private
   */
  private _permissions$ = new BehaviorSubject<Array<Permission>>([]);

  /**
   * Subscribe to begin streaming the latest value that was pushed to the {@link _permissions$} subject.
   *
   * @public
   */
  public permissions$ = this._permissions$.asObservable();

  /**
   * Sends an array of {@link Permission} objects to those subscribed to the {@link permissions$} observable.
   *
   * @public
   * @param {Array<Permission>} value
   */
  public setPermissions$(value: Array<Permission>) {
    this.logger.debug(
      `Setting the user's permissions to ${JSON.stringify(value, null)}`
    );
    this._permissions$.next(value);
  }

  /**
   * Used internally by {@link setRoles$} to send a value to subscribers of the {@link roles$} observable.
   *
   * @private
   */
  private _roles$ = new ReplaySubject<Array<Role>>(1);

  /**
   * Subscribe to begin streaming the latest value that was pushed to the {@link _roles$} subject.
   *
   * @public
   */
  public roles$ = this._roles$.asObservable();

  /**
   * Sends an array of {@link Role} objects to those subscribed to the {@link roles$} observable.
   *
   * @public
   * @param {Array<Role>} value
   */
  public setRoles$(value: Array<Role>) {
    this.logger.debug(
      `Setting the user's roles to ${JSON.stringify(value, null)}`
    );
    this._roles$.next(value);
  }

  /**
   * Used internally by {@link setUser$} to send a value to subscribers of the {@link user$} observable.
   *
   * @private
   * @deprecated Please use anything else instead :)
   */
  private _user$ = new ReplaySubject<User>(1);

  /**
   * Subscribe to begin streaming the latest value that was pushed to the {@link _user$} subject.
   *
   * @public
   * @deprecated Please use anything else instead :)
   */
  public user$ = this._user$.asObservable();

  /**
   * Sends an instance of the {@link User} object to those subscribed to the {@link user$} observable.
   *
   * @public
   * @param {User} value
   * @deprecated Please use anything else instead :)
   */
  public setUser$(value: User) {
    this.logger.debug(`Setting the user to ${JSON.stringify(value, null)}`);
    this._user$.next(value);
  }
}
