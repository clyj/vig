import * as fs from "fs";
import * as async from "async";

import { HTTP } from "./Components/HTTP";

import { VBase, VConfig, VFallback, VCondition, VError, VMiddleware, VPolicy, VRouter, VValidator } from "./Components";

export class VHandler {
  protected urls: string[] = [];
  protected path: string;
  protected prefix = "";

  protected config: VConfig;
  protected condition: VCondition;
  protected error: VError;
  protected middleware: VMiddleware;
  protected policy: VPolicy;
  protected router: VRouter;
  protected validator: VValidator;
  protected fallback: VFallback;

  constructor(urls: string[], path: string = "", prefix = "") {
    this.urls = urls || [];
    this.path = path;
    this.prefix = prefix;

    this.config = new VConfig(path);
    this.condition = new VCondition(path);
    this.error = new VError(path);
    this.middleware = new VMiddleware(path);
    this.policy = new VPolicy(path);
    this.router = new VRouter(path);
    this.validator = new VValidator(path);
    this.fallback = new VFallback(path);
    const data = ["config", "condition", "error", "middleware", "policy", "router", "validator"];
    for (let i = 0; i < data.length; i++) {
      const key = data[i];
      this[key].loadOn();
    }
    this.updateFallbacks();
  }

  public set(config) {
    const keys = {
      condition: "conditions",
      middleware: "middlewares",
      router: "routers",
      policy: "policies",
      validator: "validations",
      fallback: "failures"
    };
    for (const key in keys) {
      if (config[keys[key]]) {
        this[key].set(config[keys[key]]);
      } else {
        this[key].set({});
      }
    }
    this.updateFallbacks();
  }

  public updateFallbacks() {
    const keys = {
      validation: "validator"
    };
    const fallbacks = this.fallback.get();
    for (const key in fallbacks) {
      if (fallbacks[key]) {
        const keyOne = this[keys[key]] || this[key];
        if (keyOne) {
          keyOne.setFailureHandler(fallbacks[key]);
        }
      }
    }
  }

  public attach(app) {
    const handler = this;
    const urls = [];
    for (let i = 0; i < this.urls.length; i++) {
      const url = this.prefix + this.urls[i];
      app.all(url, (req, res) => {
        this.run(req, res);
      });
    }
  }

  public run(req, res) {
    // Middlewares should not be failed
    this.middleware.process(req, res, () => {
      this.policy.process(req, res, () => {
        this.condition.process(req, res, () => {
          this.validator.process(req, res, () => {
            this.router.process(req, res, (error) => {
              this.notFound(error, req, res);
            });
          });
        });
      });
    });
  }

  public notFound(error, req, res) {
    if (error) {
      res.status(404).send("Not Found!");
    }
  }

  public toJSON() {
    const json: any = {};
    json.prefix = this.prefix;
    json.urls = this.urls;
    json.routers = this.router.toMethods();
    json.middlewares = this.middleware.get();
    json.policies = this.policy.toMethods();
    json.validations = this.validator.get();
    json.conditions = this.condition.get();
    json.failures = this.fallback.get();
    return json;
  }
}