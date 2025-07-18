# مشروع SRE – إعداد بيئة Kubernetes

مرحباً، أنا **حنان** 🌸

هذا توثيق كامل لمشروعي العملي لإعداد بيئة تشغيل ثلاث خدمات ويب على Kubernetes بشكل مرتب ومنظم، مع توضيح الملاحظات والتحديات التي واجهتها.
## 📊 رسم توضيحي للبنية

![رسم الشجرة](https://github.com/HananAlghamdi80/sre-hanan-project/blob/main/diagrams/pro-tree.png?raw=true)

---

## 📦 مكونات النظام

- **api-hanan (Node.js)**: خدمة API الأساسية.
- **auth-hanan (Go)**: خدمة المصادقة.
- **image-hanan (Python)**: خدمة إدارة الصور.

---

## 🏗️ بنية النظام

- أنشأت Namespace باسم `prod-hanan` لعزل بيئة العمل.
- جهزت **Network Policies** للتحكم في التواصل بين الخدمات، مثل السماح لـ `api-hanan` بالتواصل مع `auth-hanan`.
- أضفت Secret باسم `db-credentials` كإعداد تجريبي، بدون ربط فعلي بالكود.

---

## 🔒 إدارة الأسرار

- استخدمت **Kubernetes Secrets** لتخزين بيانات حساسة مثل كلمات مرور قاعدة البيانات بدون وضعها في ملفات YAML أو الكود مباشرة.
- لم يتم ربطها فعلياً بالكود، لأن تركيز المشروع كان على إعداد البيئة.

---

## ⚡ التوسع والجاهزية

- أضفت **Horizontal Pod Autoscaler (HPA)** لكل خدمة لتتمكن من التوسع بناءً على استهلاك الموارد.
- أضفت **Liveness** و **Readiness Probes**، لكن حالياً الخدمات لا تحتوي على endpoint مثل `/health`، مما تسبب في ظهور CrashLoopBackOff في بعض البودات.
- أضفت **PodDisruptionBudget** لكل خدمة لضمان توفر الحد الأدنى من البودات أثناء الصيانة.

---

## 📊 الرصد والمراقبة

- نصّبت **Prometheus** و **Grafana** باستخدام Helm.
- أضفت **Alertmanager** ضمن الـ stack لمراقبة الخدمات.
- تابعت حالة النظام وسجلت الملاحظات المتعلقة بالمشاكل التي ظهرت.


---

## 🔐 TLS والشهادات

- لم أقم بإضافة شهادة TLS لأن **Docker Desktop** كبيئة محلية لا يدعم شهادات Let's Encrypt بدون وجود اسم نطاق وربط DNS.
- كتبت ملاحظة في ملف Ingress YAML بأهمية تفعيل TLS في بيئة الإنتاج لاحقاً.

---

## ⚠️ الملاحظات والتحديات

- CrashLoopBackOff لبعض البودات بسبب عدم وجود health check فعلي بالكود.
- `node-exporter` في CrashLoopBackOff بسبب قيود Docker Desktop، بدون تأثير على عمل الخدمات.
- HPA يظهر كـ `unknown` بسبب قيود `metrics-server` في البيئة المحلية.
- لم أضف S3 لأن المطلوب كان إعداد معماري فقط دون تنفيذ فعلي.

---

## 🧪 تجارب الفشل

- حذفت بود من `api-hanan` وتأكدت من أن Kubernetes أنشأ بوداً جديداً تلقائياً بدون توقف بالخدمة.
- كررت التجربة على `auth-hanan` وظهرت نفس النتيجة.
- تابعت الأحداث باستخدام:
  ```bash
  kubectl get events

  ## 🗑️ حذف Pod

![حذف Pod](https://github.com/HananAlghamdi80/sre-hanan-project/blob/main/diagrams/delete-pod.png?raw=true)
