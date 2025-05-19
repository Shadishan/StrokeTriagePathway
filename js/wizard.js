
    const steps = {
      start: { question: "Has EMS notified or patient meets BE FAST in ED?", options: [
          { label: "Yes", next: "lkw" },
          { label: "No", next: "result_noStroke" }
        ]
      },
      lkw: { question: "Last Known Well (LKW)?", options: [
          { label: "≤ 6 h", next: "lvl0" },
          { label: "6–24 h", next: "lvl6to24" },
          { label: "> 24 h", next: "result_tier3" }
        ]
      },
      lvl0: { question: "NIHSS ≥ 6 or cortical signs?", options: [
          { label: "Yes", next: "result_tier1" },
          { label: "No", next: "result_tier2" }
        ]
      },
      lvl6to24: { question: "NIHSS ≥ 6?", options: [
          { label: "Yes", next: "result_tier2" },
          { label: "No", next: "result_tier2" }
        ]
      },
      result_tier1: { result: { tier: "Tier 1 – Emergent", badge: "Tier 1", desc: "Suspected LVO <6 h. Activate full stroke team immediately.", actions: [
            "Page Stroke Team pager (505‑272‑3333)",
            "Order STAT CT/CTA",
            "Prepare for IV tPA ± endovascular",
            "Establish LKW Date/Time (Confirm LKW vs First Seen Sick)",
            "POC Glucose (treat if <70 and reassess for BEFAST)"
          ]
        }
      },
      result_tier2: { result: { tier: "Tier 2 – Urgent", badge: "Tier 2", desc: "Moderate/minor deficits <24 h or NIHSS screening.", actions: [
            "Page Stroke Team within 10 min",
            "Obtain CT/CTA or MRI",
            "Evaluate for IV tPA/EVT",
            "Establish LKW Date/Time (Confirm LKW vs First Seen Sick)",
            "POC Glucose (treat if <70 and reassess for BEFAST)"
          ]
        }
      },
      result_tier3: { result: { tier: "Tier 3 – Consult", badge: "Tier 3", desc: "", actions: [
            "ED provider sees patient ASAP",
            "Neurology Resident responds to bedside within 45 minutes",
            "Arrange ASAP Stroke Clinic Referral",
            "Consider Outpatient MRI with DWI"
          ]
        }
      },
      result_noStroke: { result: { tier: "No Stroke Alert", badge: "Info", desc: "Presentation not consistent with acute stroke.", actions: [
            "Proceed with routine care",
            "Check POC Blood Glucose, if <70 treat and reassess for BEFAST",
            "Advise patient on warning signs"
          ]
        }
      }
    };

    const wizardBody = document.getElementById('wizard-body');
    function renderStep(id) {
      const node = steps[id];
      wizardBody.innerHTML = '';
      if (node.question) {
        const q = document.createElement('div'); q.className = 'step-question'; q.textContent = node.question;
        wizardBody.appendChild(q);
        const opts = document.createElement('div'); opts.className = 'options';
        node.options.forEach(o => {
          const btn = document.createElement('button'); btn.className = 'primary'; btn.textContent = o.label;
          btn.onclick = () => renderStep(o.next);
          opts.appendChild(btn);
        });
        wizardBody.appendChild(opts);
      } else {
        const card = document.createElement('div');
        const cls = node.result.badge === 'Tier 1' ? 'tier1' : node.result.badge === 'Tier 2' ? 'tier2' : node.result.badge === 'Tier 3' ? 'tier3' : 'info';
        card.className = 'result ' + cls;
        const badge = document.createElement('span'); badge.className = 'badge'; badge.textContent = node.result.badge;
        card.appendChild(badge);
        const h2 = document.createElement('h2'); h2.textContent = node.result.tier; card.appendChild(h2);
        if (node.result.desc) {
          const p = document.createElement('p'); p.textContent = node.result.desc; p.className = 'highlight-desc'; card.appendChild(p);
        }
        const box = document.createElement('div'); box.className = 'call-box';
        node.result.actions.forEach(a => { const pa = document.createElement('p'); pa.textContent = a; box.appendChild(pa); });
        card.appendChild(box);
        const restart = document.createElement('button'); restart.className = 'neutral'; restart.textContent = 'Start Over'; restart.onclick = () => renderStep('start');
        card.appendChild(restart);
        wizardBody.appendChild(card);
      }
    }
    renderStep('start');