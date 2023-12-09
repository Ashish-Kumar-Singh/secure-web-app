// utils.spec.ts
import { TestBed } from '@angular/core/testing';
import { Utils } from './utils';

describe('Utils', () => {
  let utils: Utils;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers:[
            Utils,
        ]
      });
    utils = TestBed.inject(Utils);
  });

  it('should be created', () => {
    expect(utils).toBeTruthy();
  });

  it('Should return false if invalid Email', () => {
    const result = utils.isValidEmail("as.com");
    expect(result).toBe(false);
  });

  it('Should return true if valid Email', () => {
    const result = utils.isValidEmail("as@gmail.com");
    expect(result).toBe(true);
  });

  it('Should return false if invalid passowrd', () => {
    const password = "password"
    const result = utils.isPasswordCorrect(password);
    expect(result).toBe(false);
  });

  it('Should return true if valid password', () => {
    const password = "P@ssword1"
    const result = utils.isPasswordCorrect(password);
    expect(result).toBe(true);
  });

  it('Should return false if valid input', () => {
    const password = "hello"
    const result = utils.hasHTMLTags(password);
    expect(result).toBe(false);
  });

  it('Should return true if html tags in input', () => {
    const password = "<p>hello</p>"
    const result = utils.hasHTMLTags(password);
    expect(result).toBe(true);
  });

});